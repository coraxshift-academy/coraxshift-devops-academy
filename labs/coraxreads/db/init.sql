CREATE TABLE IF NOT EXISTS books (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL,
    author text NOT NULL,
    price_cents integer NOT NULL CHECK (price_cents >= 0)
);

INSERT INTO books (title, author, price_cents)
VALUES
    ('The Little Bookshop', 'A. Reader', 1299),
    ('Reliable Releases', 'D. Operator', 1899),
    ('The Patient Penguin', 'C. Learner', 999);
