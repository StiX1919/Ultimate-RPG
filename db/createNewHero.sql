insert into heroes (hero_name, hero_class, gold, user_id, pix_art, hero_status)
values ($1, $2, $3, $4, $5, 'alive');
select * from heroes where user_id = $4 and hero_name = $1
