CREATE TABLE public.login
(
    id serial PRIMARY KEY,
    hash character varying(100) NOT NULL,
    email text UNIQUE NOT NULL
)