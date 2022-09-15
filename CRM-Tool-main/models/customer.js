const mongoose = require('mongoose');
const {Schema} = mongoose;

const customerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Customer must have a name!']
  },
  tel: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: [true, 'Email required']
  },
  address: {
    type: String
  }
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer;
