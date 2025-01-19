const express = require('express');
const router = express.Router();
const books = require('../booksdb.js');

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});


// Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});


// Get books by author
router.get('/author/:author', (req, res) => {
  const result = Object.values(books).filter((book) => book.author === req.params.author);
  res.json(result);
});


// Get books by title
router.get('/title/:title', (req, res) => {
  const result = Object.values(books).filter((book) => book.title === req.params.title);
  res.json(result);
});

router.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (book) {
    res.json({ reviews: book.reviews });
  } else {
    res.status(404).send('Book not found');
  }
});

// Async Callback Function to Get All Books
router.get("/async-books", async (req, res) => {
  try {
    // Simulating an async function
    const fetchBooks = (callback) => {
      setTimeout(() => {
        callback(null, books);
      }, 500); // Simulating a delay
    };

    fetchBooks((error, result) => {
      if (error) {
        return res.status(500).send("Error fetching books");
      }
      res.json(result); // Send the books as response
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Search by ISBN using Promises
router.get("/isbn-promise/:isbn", (req, res) => {
  const { isbn } = req.params;

  // Promise function to find the book
  const findBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject("Book not found");
        }
      }, 500); // Simulating a delay
    });
  };

  // Using the Promise to search the book
  findBookByISBN(isbn)
    .then((book) => {
      res.json(book);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

// Search by Author using Promises
router.get("/author-promise/:author", (req, res) => {
  const { author } = req.params;

  // Promise function to find books by the author
  const findBooksByAuthor = (author) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const booksByAuthor = Object.values(books).filter((book) => book.author === author);
        if (booksByAuthor.length > 0) {
          resolve(booksByAuthor);
        } else {
          reject("No books found for the given author");
        }
      }, 500); // Simulating a delay
    });
  };

  // Using the Promise to search books
  findBooksByAuthor(author)
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

// Search by Title using Promises
router.get("/title-promise/:title", (req, res) => {
  const { title } = req.params;

  // Promise function to find books by title
  const findBooksByTitle = (title) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const booksByTitle = Object.values(books).filter((book) => book.title === title);
        if (booksByTitle.length > 0) {
          resolve(booksByTitle);
        } else {
          reject("No books found with the given title");
        }
      }, 500); // Simulating a delay
    });
  };

  // Using the Promise to search books
  findBooksByTitle(title)
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});


module.exports.general = router;