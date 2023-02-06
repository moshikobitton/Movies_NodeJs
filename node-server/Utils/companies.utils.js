// This file contains all RESTful calls functions.

const sql = require("mssql");
require('dotenv').config();

const dbConfig = {
    user: process.env.user,
    password: process.env.password,
    server: process.env.server,
    database: process.env.database,
    trustServerCertificate: true
};

// connect to your database (Microsoft SQL Server)
sql.connect(dbConfig);

// Api = "/addCompany".
// Add function.
function addCompany(req, res){
    try {
        var request = new sql.Request();
        const rawValues = req.body;
        // query to the database and add new company.
        request.query("INSERT INTO Companies_M ([username],[password],[compName],[oprCountry],[numCinemaOwns],[established]) VALUES ('"+rawValues.UserName+"','"+rawValues.Password+"','"+rawValues.CompName+"','"+rawValues.OprCountry+"','"+rawValues.NumCinemaOwns+"','"+rawValues.Established+"')",

            function (err, recordset) {
                let message = "Company added successfully";
                if (err) message = err.originalError.info.message;
                if (message.includes("Violation of UNIQUE KEY")) message = "Your username already exist!";
    
                // send records as a response
                res.status(200).json({message});
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
exports.addCompany = addCompany;


// Api = "/getCompany".
// return company function.
function getCompany(req, res){
    try {

        let username = req.params.username;
        let password = req.params.password;
        var request = new sql.Request();
        
        // query to the database and add new company.
        request.query("SELECT * FROM Companies_M WHERE username = '" + username + "' and password = '" + password +"'",
            function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.status(200).json({results : recordset});

        });
        
    } catch (error) {
        res.status(500).json({error: error.message});

    }
}
exports.getCompany = getCompany;


// Api = "/getCompanies".
// return companies function.
function getCompanies(req, res){
    try {
        var request = new sql.Request();

        // query to the database and add new company.
        request.query("SELECT * FROM Companies_M WHERE type <>'M'",
            function (err, recordset) {
            
            if (err){ 
                res.status(500).json({err});
            }

            // send records as a response
            else res.status(200).json({results : recordset});
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
exports.getCompanies = getCompanies;


// Api = "/deleteCompany/:id".
// delete company function.
function deleteCompany(req, res){
    try {
        let id = req.params.id;
        var request = new sql.Request();
        
        // query to the database and add new company.
        request.query("DELETE FROM Company_Movie_M WHERE idC = '" + id + "' DELETE FROM Companies_M WHERE id = '" + id + "' SELECT * FROM Companies_M WHERE type <>'M'",
            function (err, recordset) {
            if (err) console.log(err)
            
            // send records as a response
            res.status(200).json({message : "Company deleted successfully!", recordset});
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
exports.deleteCompany = deleteCompany;


// Api = "/updateCompany".
// update company function.
function updateCompany(req, res){
    try {
        var request = new sql.Request();
        const rawValues = req.body;
        // query to the database and add new company.
        request.query("UPDATE Companies_M set username = '"+rawValues.UserName+"' ,password = '"+rawValues.Password+"' ,  compName = '"+rawValues.CompName+"' , oprCountry = '"+rawValues.OprCountry+"' ,numCinemaOwns = '"+rawValues.NumCinemaOwns+"' ,established = '"+rawValues.Established+"' WHERE id = '"+rawValues.Id+"' SELECT* FROM Companies_M WHERE type <>'M'",
        

        function (err, recordset) {
            let message = "Company updated successfully";
            if (err) message = err.originalError.info.message;
            if (message.includes("Violation of UNIQUE KEY")) message = "This username already exist!";

            // send records as a response
            res.status(200).json({message ,recordset});
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
exports.updateCompany = updateCompany;