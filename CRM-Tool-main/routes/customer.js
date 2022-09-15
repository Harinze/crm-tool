const express = require('express');
const router = express.Router();

// require model database
const Customer = require('../models/customer');

var isAuth = (req, res, next) => {
  if(req.session.isAuth) {
    next()
  } else {
    res.redirect('/')
  }
}

router.get('/', isAuth, async (req, res) => {
  const customers = await Customer.find({});
  res.render('pages/customers/index', {customers});
})



router.get('/new', (req, res) => {
  res.render('pages/customers/new');
})
// EDIT ROUTES
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  res.render('pages/customers/edit', {customer});
})

router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const customer = await Customer.findByIdAndUpdate(id, { ...req.body.customer })
  const allCustomers = await Customer.find({});
  req.flash('success', 'Successfully updated customer information.')
  res.redirect('/dashboard/customers');
})

// submit new customer
router.post('/', async(req, res) => {
  const customer = new Customer(req.body.customer);
  await customer.save();
  res.redirect('/dashboard/customers');
})

// delete from index
router.delete('/:id', async (req,res) => {
  const { id } = req.params;
  const customers = await Customer.find({});
  const deleted = await Customer.findByIdAndDelete(id);
  console.log(`deleted ${deleted}`);
  res.redirect('/dashboard/customers');
});

module.exports = router;
