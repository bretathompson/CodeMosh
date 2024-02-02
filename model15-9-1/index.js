
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurant_id: String,
  name: String,
  borough: String,
  cuisine: String,
  grades: [{
      date: Date,
      grade: String,
      score: Number,
    },
  ],
  address: {
    building: String,
    street: String,
    zipcode: String,
    coord: [Number, Number],
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

mongoose.connect('mongodb://localhost:27017/otech-assignments', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


Restaurant.find({}).exec((err, result) => {
    if (err) throw err;
    console.log(result);
  });


Restaurant.find({borough: 'Bronx'}).limit(5).exec((err, result) => {
  if (err) throw err;
  console.log(result);
});


Restaurant.find({'grades.score': {$gt: 80, $lt: 100} }, (err, result) => {
  if (err) throw err;
  console.log(result);
});


Restaurant.find({name: /^Wil/}, 'restaurant_id name borough cuisine', (err, result) => {
  if (err) throw err;
  console.log(result);
});


Restaurant.find({'address.coord.0': {$gte: -79.9, $lte: -70}}, (err, result) => {
  if (err) throw err;
  console.log(result);
});


Restaurant.find({'address.zipcode': '10014'}, (err, result) => {
  if (err) throw err;
  console.log(result);
});


Restaurant.find({'grades.grade': {$gte: '6'}}, (err, result) => {
  if (err) throw err;
  console.log(result);
});


Restaurant.find({'grades.grade': 'A'}, 'name address', (err, result) => {
  if (err) throw err;
  console.log(result);
});


Restaurant.find({'address.building': '220'}, (err, result) => {
  if (err) throw err;
  console.log(result);
});

