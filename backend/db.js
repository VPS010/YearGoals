const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URI;

mongoose.connect('mongodb://mongoDB:27017/Goals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const goalSchema = new mongoose.Schema({
  username: String,
  title: String,
  description: String,
  addedon: {
    type: Date,
    default: Date.now,
  },
  dedline: Date,
  completed: {
    type: Boolean,
    default: false,
  },
});

const goals = mongoose.model('goals', goalSchema);

module.exports = { goals };
