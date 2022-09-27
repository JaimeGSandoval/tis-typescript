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

