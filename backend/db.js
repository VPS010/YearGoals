const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://vinayprakashsenapati01:n3rXnqOq2kSFuBPp@cluster0.bmadf.mongodb.net/yeargoals");

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