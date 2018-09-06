const express = require('express');
const app = express();

const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'app-aggregator';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

const repoRoutes = require('./routes/repoRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/repo', repoRoutes);
app.use('/users', userRoutes);

app.listen(3001, () => console.log('listening on port 3000!'));