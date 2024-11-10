CREATE TABLE theories (
    id SERIAL PRIMARY KEY,         -- Unique identifier for each theory
    title VARCHAR(255) NOT NULL,          -- Title of the theory, e.g., "The Moon Landing Was Faked"
    description TEXT NOT NULL             -- Description providing details of the theory
);