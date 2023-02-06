// This file contains all RESTful calls and route them.

// Imports libraries.
const express = require('express');

// Get all utils functions.
const utils = require('../Utils/movies.utils.js');

// Creating router.
const moviesRouter = express.Router();

// Creating 'post' call that add a new movie to DB.
moviesRouter.post("/addMovie",utils.addMovie);

// Creating 'post' call that add a new movie to specific company.
moviesRouter.post("/addMovieToCompany",utils.addMovieToCompany);

// Creating 'get' call that returns all company movies by company id.
moviesRouter.get("/getCompanyMovies/:id",utils.getCompanyMovies);

// Creating 'get' call that returns movie by his id.
moviesRouter.get("/getMovie/:id",utils.getMovieById);

// Creating 'delete' call for deleting a movie from company.
moviesRouter.delete("/deleteMovieFromCompany/:id/:movieId",utils.deleteMovie);

// Creating 'get' call that returns all movies by name from external api db.
moviesRouter.get("/getMoviesByName/:name",utils.getMoviesByName);

// Creating 'get' call that returns a movie by id from external api db.
moviesRouter.get("/getMovieByIdFromApi/:id",utils.getMovieByIdFromApi);

// MUST to export this file for main server.
module.exports = moviesRouter;