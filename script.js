// server.js
const express = require('express');
const app = express();

// Middleware to verify working hours
const checkWorkingHours = (req, res, next) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 is Sunday, 6 is Saturday
  const currentHour = currentDate.getHours();

  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour <= 17) {
    next(); // Proceed if within working hours
  } else {
    res.send('The web application is only available during working hours (Mon-Fri, 9-17).');
  }
};

// Apply middleware
app.use(checkWorkingHours);

// Serve static files (CSS)
app.use(express.static('public'));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
