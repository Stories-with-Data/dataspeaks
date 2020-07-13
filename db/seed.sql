CREATE TABLE "footer_links" (
  "id" serial PRIMARY KEY,
  "link_name" text,
  "url" text
);

CREATE TABLE "states" (
  "state_name" text UNIQUE PRIMARY KEY,
  "state_abv" varchar(2) UNIQUE
);

CREATE TABLE "iat_data" (
  "id" serial PRIMARY KEY,
  "state_name" text,
  "race" text
);

CREATE TABLE "fbi_data" (
  "state_abv" varchar(2),
  "race" text,
  "violent_arrests" integer,
  "non_violent_arrests" integer
);

CREATE TABLE "prison_data" (
  "state_abv" varchar(2),
  "race" int,
  "pop_count" int
);

CREATE TABLE "races" (
  "name" text UNIQUE PRIMARY KEY,
  "iat_lookup" text UNIQUE,
  "census_lookup" text UNIQUE,
  "prison_lookup" int UNIQUE
);

ALTER TABLE "iat_data" ADD FOREIGN KEY ("state_name") REFERENCES "states" ("state_name");

ALTER TABLE "fbi_data" ADD FOREIGN KEY ("state_abv") REFERENCES "states" ("state_abv");

ALTER TABLE "fbi_data" ADD FOREIGN KEY ("race") REFERENCES "races" ("name");

ALTER TABLE "iat_data" ADD FOREIGN KEY ("race") REFERENCES "races" ("iat_lookup");

ALTER TABLE "prison_data" ADD FOREIGN KEY ("race") REFERENCES "races" ("prison_lookup");

ALTER TABLE "prison_data" ADD FOREIGN KEY ("state_abv") REFERENCES "states" ("state_abv");

CREATE INDEX ON "races" ("iat_lookup");

CREATE INDEX ON "races" ("census_lookup");

CREATE INDEX ON "races" ("prison_lookup");


-- This fills the tables with default data
insert into races (name)
values ('Asian'), ('Native Hawaiian'), ('Black or African American'),
('American Indian or Alaska Native'), ('white'), ('Other');

insert into states (state_name, state_abv)
values ('Alabama', 'AL'), ('Alaska', 'AK'), 
('Arizona', 'AZ'), ('Arkansas', 'AR'),
('California', 'CA'), ('Colorado', 'CO'),
('Connecticut', 'CT'), ('Delaware', 'DE'),
('Florida', 'FL'), ('Georgia', 'GA'),
('Hawaii', 'HI'), ('Idaho', 'ID'),
('Illinois', 'IL'), ('Indiana', 'IN'),
('Iowa', 'IA'), ('Kansas', 'KS'),
('Kentucky', 'KY'), ('Louisiana', 'LA'),
('Maine', 'ME'), ('Maryland', 'MD'),
('Massachusetts', 'MA'), ('Michigan', 'MI'),
('Minnesota', 'MN'), ('Mississippi', 'MS'),
('Missouri', 'MO'), ('Montana', 'MT'),
('Nebraska', 'NE'), ('Nevada', 'NV'),
('New Hampshire', 'NH'), ('New Jersey', 'NJ'),
('New Mexico', 'NM'), ('New York', 'NY'),
('North Carolina', 'NC'), ('North Dakota', 'ND'),
('Ohio', 'OH'), ('Oklahoma', 'OK'),
('Oregon', 'OR'), ('Pennsylvania', 'PA'),
('Rhode Island', 'RI'), ('South Carolina', 'SC'),
('South Dakota', 'SD'), ('Tennessee', 'TN'),
('Texas', 'TX'), ('Utah', 'UT'),
('Vermont', 'VT'), ('Virginia', 'VA'),
('Washington', 'WA'), ('West Virginia', 'WV'),
('Wisonsin', 'WI'), ('Wyoming', 'WY');
