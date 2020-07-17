SELECT
  f.state_name AS state_name,
  SUM(f.non_violent_arrests) AS non_violent_arrests,
  SUM(f.violent_arrests) AS violent_arrests,
  SUM(cd.population) AS population,
  ROUND(
    (
      (
        SUM(f.non_violent_arrests) + SUM(f.violent_arrests)
      ) / SUM(cd.population) :: FLOAT
    ) * 100000
  ) AS arrest_rate,
  ROW_NUMBER () OVER (
    ORDER BY
      round(
        (
          (
            SUM(f.non_violent_arrests) + SUM(f.violent_arrests)
          ) / SUM(cd.population) :: FLOAT
        ) * 100000
      ) DESC
  ) AS rank
FROM
  fbi_data_states f
  JOIN census_data cd ON (cd.state, cd.race) = (f.state_name, f.race)
WHERE
  f.race = 'Black or African American'
  AND
  f.state_name != 'Washington DC'
GROUP BY
  f.state_name
ORDER BY
  arrest_rate DESC;