const mongoose = require('mongoose');
const {Schema} = mongoose;
const Product = require('./products');

const supplierSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Supplier must have a name!']
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
  },
  products: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Product'
    }
  ]
})

//mongoose middleware
// deletes the associated products when deleting a specific supplier
supplierSchema.post('findOneAndDelete', async function (supplier) {
  if (supplier.products.length) {
    const res = await Product.deleteMany({ _id: { $in: supplier.products }})
    console.log(res);
  }
})

// compile our model for export
const Supplier = mongoose.model('Supplier', supplierSchema)

// export model
module.exports = Supplier;
