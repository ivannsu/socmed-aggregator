const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const repoRoutes = require('./routes/repoRoutes');
const userRoutes = require('./routes/userRoutes');

mongoose.connect('mongodb://localhost:27017/app-aggregator', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose OK');
});

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/repo', repoRoutes);
app.use('/users', userRoutes);

app.listen(3001, () => console.log('listening on port 3000!'));