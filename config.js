const config = {
  // CONNECTION_URI: "mongodb+srv://JuanCamilo:gilleschatelet1@cluster0.kxfen.mongodb.net/myFlixDB?retryWrites=true&w=majority"
  CONNECTION_URI: process.env.CONNECTION_URI || 'mongodb://localhost:27017/myFlixDB'
}

module.exports = config;

