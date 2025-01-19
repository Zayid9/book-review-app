const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const general_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

// Session middleware
app.use(
  '/customer',
  session({ secret: 'fingerprint_customer', resave: true, saveUninitialized: true })
);

// Authentication middleware
app.use('/customer/auth/*', function auth(req, res, next) {
  // Implement session-based authentication
  if (req.session.token) {
    jwt.verify(req.session.token, 'fingerprint_customer', (err, decoded) => {
      if (err) return res.status(403).send('Unauthorized');
      req.user = decoded;
      next();
    });
  } else {
    return res.status(403).send('Unauthorized');
  }
});

const PORT = 5000;

// Routes
app.use('/customer', customer_routes);
app.use('/', general_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));