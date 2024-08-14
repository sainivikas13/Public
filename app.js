const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

app.get('/book', (req, res) => {
  db.all('SELECT * FROM book', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ books: rows });
  });
});

app.get('/book/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM book WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json({ book: row });
  });
});

app.post('/book', (req, res) => {
  const { name, author, year } = req.body;
  db.run('INSERT INTO book (name, author, year) VALUES (?, ?, ?)', [name, author, year], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ book: { id: this.lastID, name, author, year } });
  });
});

app.put('/book/:id', (req, res) => {
  const { id } = req.params;
  const { name, author, year } = req.body;
  db.run('UPDATE book SET name = ?, author = ?, year = ? WHERE id = ?', [name, author, year, id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ book: { id, name, author, year } });
  });
});

app.delete('/book/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM book WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(204).end();
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
