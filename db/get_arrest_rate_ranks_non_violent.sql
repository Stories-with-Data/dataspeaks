SELECT
  f.state_name AS state,
  f.race,
  f.non_violent_arrests,
  cd.population,
  round(
    (f.non_violent_arrests / cd.population :: FLOAT) * 100000
  ) AS non_violent_arrest_rate,
  ROW_NUMBER () OVER (
    ORDER BY
      round(
        (f.non_violent_arrests / cd.population :: FLOAT) * 100000
      ) DESC
  ) AS rank
FROM
  fbi_data_states f
  JOIN census_data cd ON (cd.state, cd.race) = (f.state_name, f.race)
WHERE
  f.race = 'Black or African American'
  AND
  f.state_name != 'Washington DC'
ORDER BY
  non_violent_arrest_rate DESC;