// var path = require('path');
// var Grid = require('gridfs-stream');
// const fs = require('fs');
// const Mongoose = require('mongoose');

// const con = Mongoose.connect('mongodb://localhost/myschool')

// fs.createReadStream()

const fs = require('fs')
const customer = {
    name: "Newbie Co.",
    order_count: 0,
    address: "Po Box City",
}
const jsonString = JSON.stringify(customer)
fs.writeFileSync('./newCustomer.json', jsonString)