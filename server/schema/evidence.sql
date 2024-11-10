CREATE TABLE evidence (
    id SERIAL PRIMARY KEY,       -- Unique identifier for each piece of evidence
    theory_id INT NOT NULL,               -- Foreign key referencing the associated theory
    evidence_text TEXT NOT NULL,            -- Description of the evidence for the theory
    FOREIGN KEY (theory_id) REFERENCES theories(theory_id) ON DELETE CASCADE
);