// This file contains all RESTful calls and route them.

// Imports libraries.
const express = require('express');

// Get all utils file functions.
const utils = require('../Utils/companies.utils.js');
const sqlInjection = require('../Utils/sqlInjection.js');

// Creating router.
const companiesRouter = express.Router();

// Creating 'post' call that add a new company to our DB.
companiesRouter.post("/addCompany",sqlInjection,utils.addCompany);

// Creating 'get' call that return company by username and password.
companiesRouter.get("/getCompany/:username/:password",sqlInjection,utils.getCompany);

// Creating 'get' call that return all companies.
companiesRouter.get("/getCompanies",utils.getCompanies);

// Creating 'delete' call for deleting a company by id.
companiesRouter.delete("/deleteCompany/:id",sqlInjection,utils.deleteCompany);

// Creating 'put' call for updating a company by id.
companiesRouter.put("/updateCompany",sqlInjection,utils.updateCompany);

// MUST to export this file for main server.
module.exports = companiesRouter;

