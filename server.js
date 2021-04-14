// Create the server
const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

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



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('The movies exploded the server!');
});

let movies =[
{
  "movieID": 1,
  "title": 'Arrival',
  "year": '2016',
  "genre": ['Drama', 'Sci-fi'],
  "length": '1h 56min',
  "director": 'Denis Villeneuve',
  "writers": ["Eric Heisserer", "Ted Chiang"],
  "starring": ["Amy Adams", "Jeremy Renner", "Forest Whitaker"],
  "imdbLink": "https://www.imdb.com/title/tt2543164/",
  "imdbRating": "7.9"
  },
  {
  "title": "Women in the Dunes",
  "year": "1964",
  "genre": ["Drama", "Thriller"],
  "length": "147 min",
  "director": "Hiroshi Teshigahara",
  "writer": "Kôbô Abe",
  "starring": ["Eiji Okada", "Kyôko Kishida", "Hiroko Itô"],
  "imdbLink": "https://www.imdb.com/title/tt0058625/",
  "imdbRating": "8.5"
  },
  {
  "title": "2001 a space odyssey",
  "year": "1968",
  "genre": ["Adventure", "Sci-Fi"],
  "length": "2h 29min ",
  "director": "Stanley Kubrick",
  "writers": ["Stanley Kubrick","Arthur C. Clarke"],
  "starring": ["Keir Dullea", "Gary Lockwood", "William Sylvester"],
  "imdbLink": "https://www.imdb.com/title/tt0062622/",
  "imdbRating": "8.3"
  },
  {
  "title": "The Tree of Life",
  "year": "2011",
  "genre": ["Drama", "Fantasy"],
  "length": "2h 29min ",
  "director": "Terrence Malick",
  "writers": "Terrence Malick",
  "starring": ["Brad Pitt,", "Sean Penn", "Jessica Chastain"],
  "imdbLink": "https://www.imdb.com/title/tt0478304/",
  "imdbRating": "6.8"
  },
  {
  "title": "Border",
  "year": "2018",
  "genre": ["Drama", "Fantasy"],
  "length": "1h 50min ",
  "director": "Ali Abbasi",
  "writers": ["Ali Abbasi","John Ajvide Lindqvist"],
  "starring": ["Eva Melander", "Eero Milonoff", "Jörgen Thorsson"],
  "imdbLink": "https://www.imdb.com/title/tt5501104/",
  "imdbRating": "7.0"
  },
  {
  "title": "Vertigo",
  "year": "1958",
  "genre": ["Mystery", "Romance","Thriller"],
  "length": "2h 8min",
  "director": "Alfred Hitchcock",
  "writers": ["Alec Coppel","Samuel A. Taylor"],
  "starring": ["James Stewart", "Kim Novak", "Barbara Bel Geddes"],
  "imdbLink": "https://www.imdb.com/title/tt0052357/?ref_=fn_al_tt_1",
  "imdbRating": "8.3"
  },
  {
  "title": "As I Was Moving Ahead Occasionally I Saw Brief Glimpses of Beauty",
  "year": "2000",
  "genre": ["Experimental", " Documentary"],
  "length": "4h 48min",
  "director": "Jonas Mekas",
  "writer": "Jonas Mekas",
  "starring": ["Jonas Mekas","Jane Brakhage","Stan Brakhage"],
  "imdbLink": "https://www.imdb.com/title/tt0052357/?ref_=fn_al_tt_1",
  "imdbRating": "8.4"
  },
  {
  "title": "Stalker",
  "year": "1979",
  "genre": ["Sci-Fi", " Drama"],
  "length": "2h 42min",
  "director": "Andrei Tarkovsky",
  "writer": ["Arkadiy Strugatskiy","Boris Strugatskiy","Andrei Tarkovsky"],
  "starring": ["Alisa Freyndlikh","Aleksandr Kaydanovskiy","Anatoliy Solonitsyn"],
  "imdbLink": "https://www.imdb.com/title/tt0052357/?ref_=fn_al_tt_1",
  "imdbRating": "8.2"
  },
  {
  "title": "My Octopus Teacher",
  "year": "2020",
  "genre": "Documentary",
  "length": "1h 25min",
  "director": ["Pippa Ehrlich","James Reed"],
  "writer": ["Pippa Ehrlich","James Reed"],
  "starring": ["Craig Foster","Tom Foster"],
  "imdbLink": "https://www.imdb.com/title/tt12888462/",
  "imdbRating": "8.2"
  },
  {
  "title": 'Werckmeister Harmonies',
  "year": "2000",
  "genre": ["Drama","Mystery"],
  "length": "2h 25min",
  "director": ["Béla Tarr","Ágnes Hranitzky"],
  "writer": "László Krasznahorkai",
  "starring": ["Lars Rudolph","Peter Fitz","Hanna Schygulla"],
  "imdbLink": "https://www.imdb.com/title/tt0249241/",
  "imdbRating": "8.2"
  }
];

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
app.post('/users', (req,res) => {
  res.send('Successful POST request registering new user');
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
