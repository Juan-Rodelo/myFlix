// Create the server
const express = require('express');
const app = express();

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

let favFilms =[
{
  "title": "Arrival",
  "year": "2016",
  "genre": ["Drama", "Sci-fi"],
  "length": "1h 56min",
  "director": "Denis Villeneuve",
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
  "title": "Werckmeister Harmonies",
  "year": "2000",
  "genre": ["Drama","Mystery"]
  "length": "2h 25min",
  "director": ["Béla Tarr","Ágnes Hranitzky"],
  "writer": "László Krasznahorkai ",
  "starring": ["Lars Rudolph","Peter Fitz","Hanna Schygulla"],
  "imdbLink": "https://www.imdb.com/title/tt0249241/",
  "imdbRating": "8.2"
},
]

//get requests

app.get('/', (req, res) => {
  res.send('Films Under Construction');
});

app.get('/movies', (req, res) => {
  res.send(topMovies);
});



app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});