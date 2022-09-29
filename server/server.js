const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

// configure environment variables

// call to connect database
connectDB();

// set port
const port = process.env.PORT || 5000;

// create express object
const app = express();

// allow cross-origin requests
app.use(cors());

// set middleware for graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
  });
}

app.listen(
  port,
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV}`)
);
