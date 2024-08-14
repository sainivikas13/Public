const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('books.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER NOT NULL
  )`);
});

module.exports = db;
