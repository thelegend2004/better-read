import express from "express";
import cors from "cors";
import sqlite3pkg from "sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const sqlite3 = sqlite3pkg.verbose();
const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

const db = new sqlite3.Database(path.join(__dirname, "db", "books.db"));

app.get("/books", (req, res) => {
  db.all("SELECT id, title, author FROM books", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: "Book not found" });

    const filePath = path.join(__dirname, "books", row.filename);
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) return res.status(500).json({ error: "Failed to load book" });
      res.send(content);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
