CREATE DATABASE todayinscience;

CREATE SCHEMA users;

SET search_path TO users, public;

CREATE TABLE users.users (
    user_id SMALLSERIAL PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(5) NOT NULL CHECK (role IN ('user', 'admin')),
    created_on TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

SELECT user_id, user_name, email FROM users.users;

SELECT user_id, user_name, email, role FROM users.users;

SELECT user_id, user_name, email FROM users.users WHERE user_id = $1;

SELECT password FROM users.users WHERE email = $1;

INSERT INTO users.users (user_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_name, email, role;

SELECT email FROM users.users WHERE email = $1;

SELECT user_name FROM users.users WHERE user_name = $1;

SELECT user_id, user_name, password, role FROM users.users WHERE email = $1;


