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

// Api = "/addMovie".
// Add movie to company.
function addMovie(req, res){
    try {
        var request = new sql.Request();
        const rawValues = req.body;
        // query to the database and add new movie.
        request.query("INSERT INTO Movies_M ([id],[name],[genre],[publish],[avg_sc],[src],[descr]) VALUES ('"+rawValues.Id+"','"+rawValues.Name.replace(/'/gi,'`')+"','"+rawValues.Genre+"','"+rawValues.Publish+"','"+rawValues.Avg_sc+"','"+rawValues.Src+"','"+rawValues.Descr.replace(/'/gi,'`')+"')",
            function (err, recordset) {
            
                let message = "Added successfully";
                if (err) message = "Already exist"; 

            // send records as a response
            res.status(200).json({message , IdM:rawValues.Id});
        });
        
    } catch (error) {
        
        res.status(500).json({error: error.message});
    }
}
exports.addMovie = addMovie;


// Api = "/addMovieToCompany".
// Add movie to company.
function addMovieToCompany(req, res){
    try {
        var request = new sql.Request();
        const rawValues = req.body;
        // query to the database and add new company.
        request.query("INSERT INTO Company_Movie_M ([idC],[idM]) VALUES ('"+rawValues.IdC+"','"+rawValues.IdM+"')",
            function (err, recordset) {
            let message = "Movie added successfully!";
            let type = "success";
            if (err) message = err.originalError.info.message;
            if (message.includes("Violation of PRIMARY KEY")){
                message = "This movie already exist for you!";
                type = "info";
            } 

            // send records as a response
            res.status(200).json({message, type});
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
exports.addMovieToCompany = addMovieToCompany;

// Api = "/getCompanyMovies/:id".
// Get all movies function.
function getCompanyMovies(req,res){
    try{
        let id = req.params.id;
        var request = new sql.Request();
        // query to the database and get the movies
        request.query("SELECT id, name, src " +
                      "FROM Movies_M inner join Company_Movie_M on id = idM " +
                      "WHERE idC ='" + id +"'", 
            function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send(recordset);
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }

}
exports.getCompanyMovies = getCompanyMovies;

// Api = "/getMovie/:id".
// Get all specific movie by his id.
function getMovieById(req, res){
    try{
        let id = req.params.id;
        var request = new sql.Request();
        // query to the database and get the movies
        request.query("SELECT * " +
                      "FROM Movies_M " +
                      "WHERE id ='" + id +"'", 
            function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
exports.getMovieById = getMovieById;


// Api = "/deleteMovieFromCompany/:id/:movieId".
// delete movie from company function.
function deleteMovie(req, res){
    try {

        let id = req.params.id;
        let movieId = req.params.movieId;
        var request = new sql.Request();
        
        // query to the database and add new company.
        request.query("DELETE FROM Company_Movie_M  WHERE idC = '" + id + "' and idM = '" + movieId + "'",
            function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.status(200).json({message : "Movie deleted successfully!"});
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
exports.deleteMovie = deleteMovie;


//`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${name}`;
function getMoviesByName(req, res){
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.key}&query=${req.params.name}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
        .then(result => {
          return result.json()
        })
        .then(
          (result) => {
            res.status(200).json(result);
          },
          (error) => {
            res.status(500).json({error: "Something is wrong with 'themoviedb' site "});
          });
}
exports.getMoviesByName = getMoviesByName;

function getMovieByIdFromApi(req, res){
    
    fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.key}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
        .then(result => {
          return result.json()
        })
        .then(
          (result) => {
            res.status(200).json(result);
          },
          (error) => {
            res.status(500).json({error: "Something is wrong with 'themoviedb' site "});
          });
}
exports.getMovieByIdFromApi = getMovieByIdFromApi;