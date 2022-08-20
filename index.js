// This file contains our main server and app.

// Imports libraries.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Get movies router object.
const moviesRouter = require('./api/movies.router.js');

// Get companies router object.
const companiesRouter = require('./api/companies.router.js');


// Create an app.
const app = express();

// Middlewars.
app.use(cors());
app.use(bodyParser.json());

// Movies controller/Router.
app.use(moviesRouter); 

// Companies controller/Router.
app.use(companiesRouter); 

// Listening to specific port.
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});