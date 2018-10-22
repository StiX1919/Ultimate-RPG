select * from heroes h
left join hero_stats s on h.hero_id = s.hero_id 
where h.hero_id = 24