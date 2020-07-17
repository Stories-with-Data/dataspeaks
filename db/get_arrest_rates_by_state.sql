SELECT
  f.state_name AS state,
  f.race,
  f.violent_arrests,
  f.non_violent_arrests,
  C .population,
  round((f.violent_arrests / C .population :: FLOAT) * 100000) AS violent_arrest_rate,
  round(
    (f.non_violent_arrests / C .population :: FLOAT) * 100000
  ) AS non_violent_arrest_rate
FROM
  fbi_data_states f
  JOIN census_data C ON (C .state, C .race) = (f.state_name, f.race)
WHERE
  state = $1;