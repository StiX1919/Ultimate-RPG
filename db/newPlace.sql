insert into map (area_name, area_type, area_x, area_y, discovered_by, x_location, y_location)
    values ($1, $2, $3, $4,$5, $6, $7);
select * from map where area_x = $3 and area_y = $4;