const mongoose = require('mongoose');

const mongoURL= process.env.MONGO_URI;
mongoose.connect(mongoURL)

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