SELECT
  ar.state as state_name,
  ar.year,
  ar.population AS state_total_pop,
  b.population AS state_black_pop,
  (b.population / ar.population :: FLOAT) AS percent_black,
  ROW_NUMBER() OVER (ORDER BY (b.population / ar.population :: FLOAT) DESC) AS rank
FROM
  (
    SELECT
      *
    FROM
      census_data
    WHERE
      race = 'All races'
  ) ar
  JOIN (
    SELECT
      *
    FROM
      census_data
    WHERE
      race = 'Black or African American'
  ) b ON (b.state, b.year) = (ar.state, ar.year)
WHERE
  ar.state != 'Washington DC'
ORDER BY
  percent_black DESC;