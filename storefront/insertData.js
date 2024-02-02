
const {MongoClient} = require('mongodb');

const mongoURL = 'mongodb://localhost:27017/storefront';
const sampleData = [
  {name: 'Item 1', price: 10},
  {name: 'Item 2', price: 20},
  // Add more items as needed
];

MongoClient.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
    const db = client.db();

    const storeItemsCollection = db.collection('storeItems');

    storeItemsCollection.insertMany(sampleData, (insertErr, result) => {
      if (insertErr) {
        console.error('Error inserting data into storeItems:', insertErr);
      } else {
        console.log(`${result.insertedCount} documents inserted into storeItems`);
      }

      client.close();
    });
  }
});
