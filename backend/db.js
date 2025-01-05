const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

const goalSchema = new mongoose.Schema({
    username:String,
    title: String,
    description: String,
    addedon: {
        type: Date,
        default: Date.now
    },
    dedline: Date,
    completed:{
        type: Boolean,
        default: false
    }

})

const goals = mongoose.model('goals',goalSchema);

module.exports={goals};