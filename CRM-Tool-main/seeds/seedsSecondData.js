const mongoose = require('mongoose');

// require model database
const Product = require('../models/products');
const Supplier = require('../models/supplier');
const Customer = require('../models/customer');
const User = require('../models/user')

mongoose.connect('mongodb://0.0.0.0:27017/crm', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

// -------------------- 4 PRODUCTS FOR EACH SUPPLIER DATA -----------------------------

// products for first supplier
const seedProducts = [{
    name: 'India Kaapi Royal',
    intensity: 'Dark Roasting',
    weight: '200g',
    itemCost: 6,
    sellingPrice: 9,
    category: 'small',
    currentStock: 40,
    supplier: '6300084bf1fb2a44558b4695'
  },
  {
    name: 'Peru El Palto',
    intensity: 'Dark Roasting',
    weight: '200g',
    itemCost: 7,
    sellingPrice: 9,
    category: 'small',
    currentStock: 20,
    supplier: '6300084bf1fb2a44558b4695'
  },
  {
    name: 'Ethiopia Yirgacheffe',
    intensity: 'Light Roasting',
    weight: '200g',
    itemCost: 9,
    sellingPrice: 11,
    category: 'small',
    currentStock: 40,
    supplier: '6300084bf1fb2a44558b4695'
  },
  {
    name: 'Ethiopia Alemu Werera',
    intensity: 'Light Roasting',
    weight: '200g',
    itemCost: 10,
    sellingPrice: 13,
    category: 'small',
    currentStock: 35,
    supplier: '6300084bf1fb2a44558b4695'
  },
  {
    name: 'Brasil Cerrado',
    intensity: 'Dark Roasting',
    weight: '1000g',
    itemCost: 30,
    sellingPrice: 34,
    category: 'big',
    currentStock: 50,
    supplier: '63021933bee5ac67250b24de'
  },
  {
    name: 'India Kaapi Royal',
    intensity: 'Dark Roasting',
    weight: '1000g',
    itemCost: 26,
    sellingPrice: 29,
    category: 'big',
    currentStock: 40,
    supplier: '63021933bee5ac67250b24de'
  },
  {
    name: 'Coffeein Italy',
    intensity: 'Dark Roasting',
    weight: '1000g',
    itemCost: 29,
    sellingPrice: 32,
    category: 'big',
    currentStock: 40,
    supplier: '63021933bee5ac67250b24de'
  },
  {
    name: 'Coffeein forte',
    intensity: 'Dark Roasting',
    weight: '1000g',
    itemCost: 29,
    sellingPrice: 33,
    category: 'big',
    currentStock: 65,
    supplier: '63021933bee5ac67250b24de'
  },
  {
    name: 'Four Pack Blend',
    intensity: 'Light Roasting',
    weight: '4x100g',
    itemCost: 15,
    sellingPrice: 18,
    category: 'combo',
    currentStock: 40,
    supplier: '63000860f1fb2a44558b4698'
  },
  {
    name: 'Four Pack Afrazia',
    intensity: 'Dark Roasting',
    weight: '4x100g',
    itemCost: 15,
    sellingPrice: 17,
    category: 'combo',
    currentStock: 60,
    supplier: '63000860f1fb2a44558b4698'
  },
  {
    name: 'Four Pack Amerika',
    intensity: 'Dark Roasting',
    weight: '4x100g',
    itemCost: 15,
    sellingPrice: 18,
    category: 'combo',
    currentStock: 65,
    supplier: '63000860f1fb2a44558b4698'
  },
  {
    name: 'Six Pack Amerika',
    intensity: 'Dark Roasting',
    weight: '6x100g',
    itemCost: 22,
    sellingPrice: 26,
    category: 'combo',
    currentStock: 35,
    supplier: '63000860f1fb2a44558b4698'
  }
]

Product.insertMany(seedProducts)
  .then(res => {
    console.log(res);
    addNewProducts();
  })
  .catch(e => {
    console.log(e)
  })

// ------------------------------UPDATING SUPPLIER WITH PRODUCTS-----------------------------------------------
const addNewProducts = async () => {
  const productsSupplier1 = await Product.find({
    'supplier': '6300084bf1fb2a44558b4695'
  });
  const productsSupplier2 = await Product.find({
    'supplier': '63021933bee5ac67250b24de'
  });
  const productsSupplier3 = await Product.find({
    'supplier': '63000860f1fb2a44558b4698'
  });
  // console.log('testing', newProducts);
  updateSupplier1(productsSupplier1);
  updateSupplier2(productsSupplier2);
  updateSupplier3(productsSupplier3);
}

const updateSupplier1 = async (products) => {
  for (let newProduct of products) {
    // console.log('thisproduct', products)
    const supplier = await Supplier.findOneAndUpdate({
      '_id': '6300084bf1fb2a44558b4695'
    }, {
      $push: {
        products: newProduct._id
      }
    });
    // console.log('supplier', supplier);
  }
};

const updateSupplier2 = async (products) => {
  for (let newProduct of products) {
    // console.log('thisproduct', products)
    const supplier = await Supplier.findOneAndUpdate({
      '_id': '63021933bee5ac67250b24de'
    }, {
      $push: {
        products: newProduct._id
      }
    });
    // console.log('supplier', supplier);
  }
};

const updateSupplier3 = async (products) => {
  for (let newProduct of products) {
    // console.log('thisproduct', products)
    const supplier = await Supplier.findOneAndUpdate({
      '_id': '63000860f1fb2a44558b4698'
    }, {
      $push: {
        products: newProduct._id
      }
    });
    // console.log('supplier', supplier);
  }
};
