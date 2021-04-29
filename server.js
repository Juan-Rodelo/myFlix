// Create the server
const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  Models = require('./models.js');

//moongose models
const Movies = Models.Movie;
const Users = Models.User;

const app = express();

//middleware function
app.use(bodyParser.json());


// Import modules for logging in
const morgan = require('morgan');

// Middleware
// Here we pass morgan into the app.use
app.use(morgan('common'));

// serves files from public folder
app.use(express.static('public'));

// Connect Moongose
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('The movies exploded the server!');
});


//   let directors =[
//   {
//   "Name": "Béla Tarr",
//   "Nationality":"Hungarian",
//   "Born": "21 July 1955"
//   },
//   {
//   "Name":"Andrei Tarkovsky",
//   "Nationality":"Russian",
//   "Born": "April 4, 1932"
//   }
// ];

//get requests
// Get all movies
app.get('/movies', (req, res) => {
  res.json(movies);
  res.send('Successful GET request returning data on all movies');
});

// Get data about a single movie, by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
});

// Get data about a director by name
app.get('/movies/directors/:name', (req,res) => {
  res.send('Successful GET request returning data on director: ' + req.params.name);
});

//New users registration
//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//Read Users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Put updates to user information
app.put('/users/:username', (req,res) => {
  res.send('Successful PUT request updating information for user: ' + req.params.username);
});

// Allows users to add a movie to their list of favorites
app.post('/users/:username/movies/:movieID', (req,res) => {
  res.send('Added movie with ID: ' + req.params.movieID + ' to favorite movie list of user: ' + req.params.username);
});

// Delete movie from list of user's favorites
app.delete('/users/:username/movies/:movieID', (req,res) => {
  res.send('Successful DELETE request removing movie with ID: ' + req.params.movieID + ' from favorite movie list of user: ' + req.params.username);
});

// Deletes user from registration database
app.delete('/users/:username', (req,res) => {
  res.send('Successful DELETE request removing user: ' + req.params.username + ' from database');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});



app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
