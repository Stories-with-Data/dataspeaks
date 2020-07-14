update fbi_data
set violent_arrests = $3
where state_abv = $1 and race = $2