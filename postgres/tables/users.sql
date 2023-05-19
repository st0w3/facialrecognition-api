CREATE TABLE users
(
    id serial PRIMARY KEY,
    name character varying(100) NOT NULL,
    email text UNIQUE NOT NULL,
    entries bigint DEFAULT 0,
    joined timestamp NOT NULL
)