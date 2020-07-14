-- ! YEAR MUST BE FORMATTED AS STRING
SELECT
  i.state_abv AS state,
  i.year,
  r.name AS race,
  SUM(i.responses) AS responses,
  SUM(i.sum_iat) / SUM(i.responses) AS iat
FROM
  iat_data i
  JOIN races r ON i.race = r.iat_lookup
WHERE
  i.state_abv = $1
  AND i.year = $2
GROUP BY
  i.state_abv,
  i.year,
  r.name
ORDER BY
  i.state_abv;