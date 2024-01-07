const express = require('express');
const connectToDatabase = require('./utils/db-connection');
const setupMiddleware = require('./utils/middleware');
const ExpressError = require('./utils/ExpressError');
const wargaRoutes = require('./routes/warga-route');
const adminRoutes = require('./routes/admin-route');
const userRoutes = require('./routes/user-route');

const app = express();
const port = process.env.PORT || 35000;

// Connect to MongoDB
connectToDatabase();

// Setup Middleware
setupMiddleware(app);

// Routes
app.use('/', userRoutes);
app.use('/admin/', adminRoutes);
app.use('/rayon/', adminRoutes);
app.use('/', wargaRoutes);


// Error route
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).render('error', { err });
});

// Listen to Port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

