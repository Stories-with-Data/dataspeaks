SELECT
  s.state_name AS state,
  SUM(i.responses) AS responses,
  SUM(i.sum_iat) / SUM(i.responses) AS iat
FROM
  iat_data i
  JOIN races r ON i.race = r.iat_lookup
  JOIN states s ON s.state_abv = i.state_abv
WHERE
  r.name != 'Black or African American'
GROUP BY
  i.state_abv,
  s.state_name
ORDER BY
  iat;