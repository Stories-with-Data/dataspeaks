DROP SCHEMA PUBLIC CASCADE;

CREATE SCHEMA PUBLIC;

GRANT ALL ON SCHEMA PUBLIC TO postgres;

GRANT ALL ON SCHEMA PUBLIC TO PUBLIC;

CREATE TABLE "footer_links" (
  "id" serial PRIMARY KEY,
  "link_name" text,
  "url" text
);

CREATE TABLE "states" (
  "state_name" text UNIQUE PRIMARY KEY,
  "state_abv" VARCHAR(2) UNIQUE,
  "census_id" VARCHAR(2) UNIQUE
);

CREATE TABLE "iat_data" (
  "year" text,
  "state_abv" text,
  "race" text,
  "responses" INT,
  "sum_iat" FLOAT
);

CREATE TABLE "fbi_data" (
  "state_abv" VARCHAR(2),
  "race" text,
  "violent_arrests" INTEGER,
  "non_violent_arrests" INTEGER
);

CREATE TABLE "prison_data" (
  "state_name" TEXT,
  "race" INT,
  "year" int,
  "pop_count" INT
);

CREATE TABLE "races" (
  "name" text,
  "iat_lookup" text UNIQUE,
  "census_lookup" text,
  "prison_lookup" INT
);

CREATE TABLE census_data (
  state text,
  race text,
  YEAR INT,
  population INT
);

CREATE TABLE state_ranks (
  state_name text UNIQUE,
  iat INT UNIQUE,
  arrest_rate INT UNIQUE,
  incarcerated_rate INT UNIQUE,
  black_pop INT UNIQUE,
  overall_calc FLOAT GENERATED ALWAYS AS ((iat + (51 - arrest_rate) + (51 - incarcerated_rate) + (black_pop * 0.02))/4 :: FLOAT) STORED
);

ALTER TABLE
  "state_ranks"
ADD
  FOREIGN KEY ("state_name") REFERENCES "states" ("state_name");

ALTER TABLE
  "iat_data"
ADD
  FOREIGN KEY ("race") REFERENCES "races" ("iat_lookup");

ALTER TABLE
  "prison_data"
ADD
  FOREIGN KEY ("state_name") REFERENCES "states" ("state_name");

ALTER TABLE
  "iat_data"
ADD
  FOREIGN KEY ("state_abv") REFERENCES "states" ("state_abv");

ALTER TABLE
  "fbi_data"
ADD
  FOREIGN KEY ("state_abv") REFERENCES "states" ("state_abv");

ALTER TABLE
  "census_data"
ADD
  FOREIGN KEY ("state") REFERENCES "states" ("state_name");


-- This view replaces state_abv on fbi_data with state_name for multicolumn index
CREATE materialized VIEW fbi_data_states AS
SELECT
  s.state_name,
  f.race,
  f.violent_arrests,
  f.non_violent_arrests
FROM
  fbi_data f
  JOIN states s ON s.state_abv = f.state_abv;

-- This view calculates arrest rates

CREATE MATERIALIZED VIEW arrest_rates AS
SELECT
  f.state_name,
  f.race,
  f.violent_arrests,
  f.non_violent_arrests,
  cd.population,
  round((f.violent_arrests / cd.population :: FLOAT) * 100000) AS violent_arrest_rate,
  round(
    (f.non_violent_arrests / cd.population :: FLOAT) * 100000
  ) AS non_violent_arrest_rate
FROM
  fbi_data_states f
  JOIN census_data cd ON (cd.state, cd.race) = (f.state_name, f.race);

CREATE INDEX arrest_rate_state_race ON arrest_rates (state_name, race);

-- This view replaces state_abv on prison_data with state_name for multicolumn index
CREATE MATERIALIZED VIEW prison_data_states AS
SELECT
  p.state_name,
  r.name AS race,
  p.year,
  round(AVG(p.pop_count)) AS pop_count
FROM
  prison_data p
  LEFT OUTER JOIN races r ON r.prison_lookup = p.race
GROUP BY
  p.state_name,
  r.name,
  p.year;



-- Creating 2 views to use for currently incarcerated rate rankings.
-- Will rank by states with the largest difference between white incarcerated ranks and black incarcerated ranks.

CREATE MATERIALIZED VIEW currently_incarcerated_rate_white AS
SELECT
  p.state_name,
  p.race,
  p.year,
  round(AVG(p.pop_count)) AS pop_count,
  round(AVG(cd.population)) AS population,
  round(
    (AVG(p.pop_count) / AVG(cd.population) :: FLOAT) * 100000
  ) AS currently_incarcerated_rate
FROM
  prison_data_states p
  JOIN census_data cd ON (cd.state, cd.race) = (p.state_name, p.race)
WHERE
  p.race = 'White or Caucasian'
GROUP BY
  p.state_name,
  p.race,
  p.year
ORDER BY
  currently_incarcerated_rate DESC;

CREATE MATERIALIZED VIEW currently_incarcerated_rate_black AS
SELECT
  p.state_name,
  p.race,
  p.year,
  round(AVG(p.pop_count)) AS pop_count,
  round(AVG(cd.population)) AS population,
  round(
    (AVG(p.pop_count) / AVG(cd.population) :: FLOAT) * 100000
  ) AS currently_incarcerated_rate
FROM
  prison_data_states p
  JOIN census_data cd ON (cd.state, cd.race) = (p.state_name, p.race)
WHERE
  p.race = 'Black or African American'
GROUP BY
  p.state_name,
  p.race,
  p.year
ORDER BY
  currently_incarcerated_rate DESC;

CREATE MATERIALIZED VIEW cir AS
SELECT
  p.state_name,
  p.race,
  round(AVG(p.pop_count)) AS pop_count,
  round(AVG(cd.population)) AS population,
  round(
    (AVG(p.pop_count) / AVG(cd.population) :: FLOAT) * 100000
  ) AS currently_incarcerated_rate
FROM
  prison_data_states p
  JOIN census_data cd ON (cd.state, cd.race) = (p.state_name, p.race)
GROUP BY
  p.state_name,
  p.race
ORDER BY
  currently_incarcerated_rate DESC;

CREATE INDEX cir_state_race ON cir (state_name, race);

-- IAT VIEW

CREATE MATERIALIZED VIEW iat_view AS
SELECT
  s.state_name,
  r.name as race,
  sum(id.responses) as iat_responses,
  sum(id.sum_iat) as iat_sum,
  (sum(id.sum_iat)/sum(id.responses) :: FLOAT) as iat_avg
FROM iat_data id
JOIN states s ON s.state_abv = id.state_abv
JOIN races r ON r.iat_lookup = id.race
GROUP BY s.state_name, r.name;

CREATE MATERIALIZED VIEW state_ranks_adj AS
SELECT
  state_name,
  iat,
  arrest_rate,
  incarcerated_rate,
  black_pop,
  RANK () OVER (
    ORDER BY
      overall_calc
  ) overall
FROM
  state_ranks;

CREATE MATERIALIZED VIEW return_data AS
select
  cd.state,
  cd.race,
  cd.population,
  i.iat_responses,
  i.iat_sum,
  i.iat_avg,
  a.non_violent_arrests,
  a.non_violent_arrest_rate,
  a.violent_arrests,
  a.violent_arrest_rate,
  p.pop_count as prison_pop_count,
  p.currently_incarcerated_rate
FROM
  census_data cd
LEFT OUTER JOIN iat_view i ON (cd.state, cd.race) = (i.state_name, i.race)
LEFT OUTER JOIN arrest_rates a ON (cd.state, cd.race) = (a.state_name, a.race)
LEFT OUTER JOIN cir p ON (cd.state, cd.race) = (p.state_name, p.race);

CREATE INDEX return_data_state_race_lookup ON return_data (state, race);

CREATE INDEX prison_state_race_lookup ON prison_data_states (state_name, race);

CREATE INDEX state_race_lookup ON census_data (state, race);

CREATE INDEX fbi_state_race_lookup ON fbi_data_states (state_name, race);

CREATE INDEX iat_state_race_lookup ON iat_view (state_name, race);

CREATE INDEX cir_white_state_year_lookup ON currently_incarcerated_rate_white (state_name, year);

CREATE INDEX cir_black_state_year_lookup ON currently_incarcerated_rate_black (state_name, year);
