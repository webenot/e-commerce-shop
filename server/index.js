require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('routes/auth');

const port = process.env.PORT || 8000;

const app = express();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch(error => {
    console.log('DB connection error', error);
  });

// Middlewares
app.use(morgan(process.env.NODE_ENV || 'production'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// Routes middlewares
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log('Server is running on  port', port);
});
