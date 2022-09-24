CREATE DATABASE todayinscience;

CREATE SCHEMA users;

SET search_path TO users, public;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_on TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login TIMESTAMP(0)
);
