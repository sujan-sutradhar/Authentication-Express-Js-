const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/miniproject')
 const userSchema= mongoose.Schema({
    username:String,
    name:String,
    email:String,
    age:String,
    password:String
})
module.exports = mongoose.model("user",userSchema)