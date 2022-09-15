const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
//const userSchema = mongoose.Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
company: {
    type: String,
    required: true
},
address: {
    type: String,
    required: true
},
tel: {
    type: String,
    required: true
},
website: {
    type: String
},
img: {
    type: String,
}
 })

 const Users = mongoose.model("Users", userSchema)

 module.exports = Users;
