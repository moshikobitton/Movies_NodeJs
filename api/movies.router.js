// This file contains all RESTful calls and route them.

// Imports libraries.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Get all utils file functions.
const utils = require('../Utils/movies.utils.js');

// Create router.
const moviesRouter = express.Router();

// Middlewars
moviesRouter.use(cors());
moviesRouter.use(bodyParser.json());

// Create 'post' call that add a new movie to db.
moviesRouter.post("/addMovie",utils.addMovie);

// Create 'post' call that add a new movie to specific company.
moviesRouter.post("/addMovieToCompany",utils.addMovieToCompany);

// Create 'get' call that returns all company movies by company id.
moviesRouter.get("/getCompanyMovies/:id",utils.getCompanyMovies);

// Create 'get' call that returns movie by his id.
moviesRouter.get("/getMovie/:id",utils.getMovieById);

// Create 'delete' call for deleting a movie from company.
moviesRouter.delete("/deleteMovieFromCompany/:id/:movieId",utils.deleteMovie);


// MUST to export this file for main server.
module.exports = moviesRouter;