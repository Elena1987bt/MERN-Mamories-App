const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const postRouter = require('./routes/postsRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
dotenv.config();

// MIDDLEWARE
app.use(express.json({ limit: '30mb', extended: true }));
app.use(cors());
app.options('*', cors());

// ROUTES

app.get('/', (req, res) => res.send('Hello from memories API'));
app.use('/posts', postRouter);
app.use('/user', userRouter);
// DATABASE CONNECTION
const CONNECTION_URL = process.env.CONNECTION_URL;
const port = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Connected to the database...');
  })
  .catch((err) => {
    console.log(err.message);
  });

// SERVER

app.listen(port, () => console.log(`Server running on port: ${port}`));
