// This file contains all RESTful calls and route them.

// Imports libraries.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Get all utils file functions.
const utils = require('../Utils/companies.utils.js');

// Create router.
const companiesRouter = express.Router();

// Middlewars
companiesRouter.use(cors());
companiesRouter.use(bodyParser.json());

// Create 'post' call that add a new company to our list.
companiesRouter.post("/addCompany",utils.addCompany);

// Create 'get' call that return company if exist.
companiesRouter.get("/getCompany/:username/:password",utils.getCompany);

// Create 'get' call that return all companies.
companiesRouter.get("/getCompanies",utils.getCompanies);

// Create 'delete' call for deleting a company by id.
companiesRouter.delete("/deleteCompany/:id",utils.deleteCompany);

// Create 'put' call for updating a company by id.
companiesRouter.put("/updateCompany",utils.updateCompany);

// MUST to export this file for main server.
module.exports = companiesRouter;

