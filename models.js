const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');
/**
 * defines the structure of the movie document and its default values,
 * validators and what is and isn't required.
 * @constant
 * @type {function}
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
    Death: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});
/**
 * defines the structure of the user document and its default values, 
 * validators and what is and isn't required.
 * @constant
 * @type {function}
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  // Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

/**
 * hashes the password so that it cannot be read in the database keeping
 * the users data secured
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
/**
 * compares the password recieved with the hashed password
 */
userSchema.methods.validatePassword = function (password) {
  console.log("compare passwords", password, this.Password)
  return bcrypt.compareSync(password, this.Password);
};

/**
 * Models provide an interface to the database for creating, querying,
 * updating, deleting records, etc
 */
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

//exporting the models
module.exports.Movie = Movie;
module.exports.User = User;
