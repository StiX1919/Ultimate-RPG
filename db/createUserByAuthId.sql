INSERT INTO users (auth_key, email) VALUES ($1, $2);
SELECT * FROM users WHERE auth_key = $1