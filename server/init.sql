CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    filename TEXT
);

INSERT INTO books (title, author, filename)
VALUES
    ('Frankenstein', 'Mary Shelley', '1.html'),
    ('Pride and Prejudice', 'Jane Austen', '2.html');