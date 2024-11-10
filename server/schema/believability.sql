CREATE TABLE believability (
    id SERIAL PRIMARY KEY,   -- Unique identifier for each believability rating
    theory_id INT NOT NULL,                -- Foreign key referencing the associated theory
    submitter VARCHAR(100) NOT NULL,       -- Name of the user giving the rating
    believability_score INT CHECK (believability_score >= 1 AND believability_score <= 10),  -- Believability score (1-10 scale)
    FOREIGN KEY (theory_id) REFERENCES theories(theory_id) ON DELETE CASCADE
);