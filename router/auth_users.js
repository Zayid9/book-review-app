const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

let users = []; // Mock user data

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(400).send('User already exists');
  }
  users.push({ username, password });
  res.send('User registered successfully');
});


// User login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username }, 'fingerprint_customer', { expiresIn: '1h' });
    req.session.token = token;
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});


// Add or update a book review
router.put('/auth/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { review } = req.query;
  const username = req.user.username;

  if (books[isbn]) {
    books[isbn].reviews.push({ username, review });
    res.send(`Review for ISBN ${isbn} added/updated by user ${username}`);
  } else {
    res.status(404).send('Book not found');
  }
});


// Delete a book review
router.delete('/auth/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username;

  if (books[isbn]) {
    books[isbn].reviews = books[isbn].reviews.filter((r) => r.username !== username);
    res.send(`Review for ISBN ${isbn} deleted by user ${username}`);
  } else {
    res.status(404).send('Book not found');
  }
});


module.exports.authenticated = router;