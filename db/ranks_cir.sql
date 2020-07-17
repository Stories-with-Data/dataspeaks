-- CIR = Currently Incarcerated Rate

REFRESH MATERIALIZED VIEW prison_data_states;

SELECT
  p.state_name,
  p.race,
  p.year,
  round(AVG(p.pop_count)) AS pop_count,
  round(AVG(cd.population)) AS population,
  round(
    (AVG(p.pop_count) / AVG(cd.population) :: FLOAT) * 100000
  ) AS currently_incarcerated_rate,
  ROW_NUMBER() OVER (
    ORDER BY
    round(
    (AVG(p.pop_count) / AVG(cd.population) :: FLOAT) * 100000) DESC
   ) AS rank
FROM
  prison_data_states p
  JOIN census_data cd ON (cd.state, cd.race) = (p.state_name, p.race)
WHERE
  p.race = 'Black or African American'
  AND
  p.state_name != 'Washington DC'
GROUP BY
  p.state_name,
  p.race,
  p.YEAR;