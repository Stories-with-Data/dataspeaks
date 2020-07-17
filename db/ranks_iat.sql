SELECT
  s.state_name AS state_name,
  SUM(i.responses) AS responses,
  SUM(i.sum_iat) / SUM(i.responses) AS iat,
  ROW_NUMBER() OVER (
    ORDER BY
      (SUM(i.sum_iat) / SUM(i.responses))
  ) AS rank
FROM
  iat_data i
  JOIN races r ON i.race = r.iat_lookup
  JOIN states s ON s.state_abv = i.state_abv
WHERE
  r.name != 'Black or African American'
  AND
  s.state_name != 'Washington DC'
GROUP BY
  i.state_abv,
  s.state_name
ORDER BY
  iat;