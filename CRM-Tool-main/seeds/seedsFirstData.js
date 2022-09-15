const mongoose = require('mongoose');

// require model database
const Supplier = require('../models/supplier');
const Customer = require('../models/customer');

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

// -------------------- CUSTOMER DATA -----------------------------
  const seedCustomers = [
    {
      name: 'Stephen Hammonds',
      tel: '443-243-5532',
      email: 'sh@gmail.com',
      address: '475 Lenfant PLZ, Washington DC, 20260'
    }, {
      name: 'Sherif Ackles',
      tel: '423-5436-2233',
      email: 'sa@gmail.com',
      address: '123 Main St, Anytown OH, 12345'
    }, {
      name: 'Jean Susor',
      tel: '444-4234-5555',
      email: 'js@gmail.com',
      address: 'PO BOX 4237, Anytown MI, 12337'
    }
  ]
    Customer.insertMany(seedCustomers)
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })

//  -------------------- SUPPLIERS DATA -----------------------------
const seedSuppliers = [
    {
     _id: '6300084bf1fb2a44558b4695',
     name: 'Kaldi Coffee',
     tel: '910-350-0990',
     email: 'kaldi@gmail.com',
     address: '278 Raleigh Street, Wilmington, Alabama'
    },
    {
      _id: '63021933bee5ac67250b24de',
      name: 'Red Diamond',
      tel: '800-543-4325',
      email: 'qcdept@reddiamond.com',
      address: '400 Park Avenue Moody, AL, 35004'
    },
    {
      _id: '63000860f1fb2a44558b4698',
      name: 'Wholesale Coffee Company Ltd',
      tel: '322-555-4853',
      email: 'wcc@gmail.com',
      address: 'Unit F2E Lomax Way, Logistics North Bolton, Alabama'
    }
  ]
    Supplier.insertMany(seedSuppliers)
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
