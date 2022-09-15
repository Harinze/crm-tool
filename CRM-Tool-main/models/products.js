const mongoose = require('mongoose');
const {Schema} = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  intensity: {
    type: String,
  },
  weight: {
    type: String,
    required: true
  },
  itemCost: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    lowercase: true,
    enum: ['small', 'big', 'combo']
  },
  currentStock: {
    type: Number,
  },
  supplier: {
    type: Schema.Types.ObjectID, // to display the owner of the products sold
    ref: 'Supplier'
  }
})

// compile our model for export
const Product = mongoose.model('Product', productSchema)

// export model
module.exports = Product;
