const express = require('express');
const router = express.Router({mergeParams: true});
const Supplier = require('../models/supplier');

router.get('/', async (req, res) => {
  const suppliers = await Supplier.find({});
  res.render('pages/suppliers/index', {suppliers});
})

router.get('/new', (req, res) => {
  res.render('pages/suppliers/new');
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findById(id).populate('products');
  if (!supplier) {
    req.flash('error', 'No supplier found!');
    return res.redirect('/dashboard/suppliers');
  }
  res.render('pages/suppliers/show', {supplier});
} )

// EDIT ROUTES
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findById(id);
  res.render('pages/suppliers/edit', {supplier});
} )

// to edit supplier
router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findByIdAndUpdate(id, { ...req.body.supplier })
  req.flash('success', 'Successfully updated supplier.')
  res.redirect(`/dashboard/suppliers/${supplier._id}`);
})

// to add a new supplier
router.post('/', async(req, res) => {
  const supplier = new Supplier(req.body.supplier);
  await supplier.save();
  res.redirect('/dashboard/suppliers');
})

// delete from index
router.delete('/:id', async (req,res) => {
  const { id } = req.params;
  const suppliers = await Supplier.find({});
  const deleted = await Supplier.findByIdAndDelete(id);
  console.log(`deleted ${deleted}`);
  res.redirect('/dashboard/suppliers');
});

// Delete route from show individual item route
router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  await Supplier.findByIdAndDelete(id);
  res.redirect('/dashboard/suppliers');
})

module.exports = router;
