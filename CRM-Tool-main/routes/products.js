const express = require('express');
const router = express.Router({mergeParams: true}); // will make a new router object

const Supplier = require('../models/supplier');
const Product = require('../models/products');
const categories = ['small', 'big', 'combo']

// show all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.render('pages/products/index', {products, categories, messages: req.flash('success')});
})

router.get('/reports', async (req, res) => {
  const data = await Product.find({});
  let itemPrice = [];
  let names = [];
  let soldPrice = [];
  const generatePrice = () => {
    for (let i = 0; i < data.length; i++) {
      itemPrice.push(data[i].itemCost);
      names.push(data[i].name);
      soldPrice.push(data[i].sellingPrice);
    }
  }
  generatePrice();
  res.render('testing', {itemPrice, names, soldPrice});
})

router.get('/new', async (req, res) => {
  const product = await Product.find({})
  const suppliers = await Supplier.find({}, {"name":1});
  res.render('pages/products/new', {product, suppliers, categories});
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('supplier');
  if (!product) {
    req.flash('error', 'Cannot find that product!');
    return res.redirect('/dashboard/products');
  }
  res.render('pages/products/show', {product});
})

router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const supplierNames = await Supplier.find({}, {"name":1});
  res.render('pages/products/edit', {product, categories, supplierNames});
})

router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, { ...req.body.product })
  const supplier = await Supplier.findOneAndUpdate({ '_id': updatedProduct.supplier }, { $push: { products: updatedProduct._id } });
  req.flash('success', 'Successfully updated product.')
  res.redirect('/dashboard/products');
})

router.post('/', async(req, res) => {
const newProduct = new Product(req.body);
await newProduct.save();
const supplier = await Supplier.findOneAndUpdate({ '_id': newProduct.supplier }, { $push: { products: newProduct._id } });
console.log(supplier);
req.flash('success', 'You have successfully added a new product!');
res.redirect('/dashboard/products');
})

// delete from index
router.delete('/:id', async (req,res) => {
  const { id } = req.params;
  const products = await Product.find({});
  const deleted = await Product.findByIdAndDelete(id);
  console.log(`deleted ${deleted}`);
  res.redirect('/dashboard/products');
});

// Delete route from show individual item route
router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/dashboard/products');
})

module.exports = router;
