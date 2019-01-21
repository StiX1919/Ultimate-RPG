UPDATE users
        SET name = $1, birthdate = $2
        WHERE user_id = $3