CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    filename TEXT
);

INSERT INTO books (title, author, filename)
VALUES
    ('Frankenstein', 'Mary Shelley', '1.html'),
    ('Moby Dick', 'Herman Melville', '2.html'),
    ('Crime and Punishment', 'Fyodor Dostoyevsky', '3.html');