
const express = require('express'),
  /**
   * Express is used to create and maintain web servers as well as manage HTTP
   * requests. Rather than using modules (e.g., the HTTP module), you can simply
   * use Express to route requests/responses and interact with request data.
   */
  bodyParser = require('body-parser'),
  /**
 * The body-parser middleware module allows you to read the “body” of HTTP
 * requests within your request handlers simply by using the code req.body.
 * const passport = require('passport'); //Passport is an authentication
 * middleware
 */
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  cors = require('cors'),
  config = require('./config');


// require passport and import the passport model
const passport = require('passport');
require('./passport.js');

//require validation
const { check, validationResult } = require('express-validator');

//moongose models exported into variables
const Movies = Models.Movie;
const Users = Models.User;

const app = express();

/**
 * Allows CORS only for the websites listed in this array
 * @constant
 * @type {array}
 */

let allowedOrigins = ['https://film-spelunker.netlify.app', 'http://localhost:8080', 'http://localhost:1234', 'http://localhost:4200', 'https://juan-rodelo.github.io'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

/**
 * Declaring app.use before the routes means that each route request
 * will run all the following app.use on it.
 */
app.use(bodyParser.json());

//import authentication file. app ensures that Express is available in your “auth.js” file as well.
let auth = require('./auth.js')(app);



// Import modules for logging in
const morgan = require('morgan');

// Middleware
// Here we pass morgan into the app.use
app.use(morgan('common'));

// serves files from public folder
app.use(express.static('public'));


/**
 * allows the API to make CRUD operations on the dataase
 */
mongoose.connect(config.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error!');
});

app.get('/', (req, res) => {
  res.send('Welcome to myFlix!')
});


//List of all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  // app.get('/movies', (req, res) => {
  Movies.find().
    then((movies) => {
      res.status(201).json(movies);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err)
    });
});

// Get data about a single movie, by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title }).then((movie) => {
    res.status(201).json(movie);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

// Get Data About Genre
app.get('/movies/genres/:Genre', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Genre }).then((genre) => {
    res.status(201).json(genre.Genre);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

//get directors by name
app.get('/movies/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name }).then((director) => {
    res.status(201).json(director.Director);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});




//New users registration
app.post('/users', [
  check('Username', 'Username is required').isLength({ min: 5 }),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // res.send('Registration succesful!')
  // Hash any password entered by the user when registering before storing it in the MongoDB database
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            // Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
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
// app.get('/users', (req, res) => {
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Update User info
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  let obj = {}
  if (req.body.Username) {
    obj.Username = req.body.Username;
  }
  if (req.body.Password) {
    let hashedPassword = Users.hashPassword(req.body.Password);

    obj.Password = hashedPassword
  }
  if (req.body.Email) {
    obj.Email = req.body.Email;
  }
  if (req.body.Birthday) {
    obj.Birthday = req.body.Birthday;
  }
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $set: obj
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  // app.post('/users/:Username/Movies/:MovieID', (req, res) => {

  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});


// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Delete a user by Id
app.delete('/users/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ _id: req.params._id })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params._id + ' was not found');
      } else {
        res.status(200).send(req.params._id + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Delete a movie from user
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});



const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
