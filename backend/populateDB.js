const mongoose = require('mongoose');
require('dotenv').config();
const Product=require('./model/Product');

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to db!')
});

async function addProduct(title, img, price) {
    var product = new Product({
        title: title,
        img: img,
        price: price
    });

    await product.save();
}

addProduct('CANDY', 'https://cdn-icons-png.flaticon.com/512/1888/1888900.png', 2.5);
addProduct('CEREAL', 'https://cdn-icons-png.flaticon.com/512/2829/2829840.png', 7.0);
addProduct('CHIPS', 'https://cdn-icons-png.flaticon.com/512/3050/3050268.png', 5.5);
addProduct('CORN', 'https://cdn-icons-png.flaticon.com/512/2619/2619499.png', 8.5);
addProduct('FLOUR', 'https://cdn-icons-png.flaticon.com/512/1182/1182154.png', 7.3);
addProduct('OIL', 'https://cdn-icons-png.flaticon.com/512/4264/4264676.png', 11.2);
addProduct('SPICES', 'https://cdn-icons-png.flaticon.com/512/2160/2160216.png', 14.5);
addProduct('TOMATO', 'https://cdn-icons-png.flaticon.com/512/1202/1202125.png', 10.5);
addProduct('VINEGAR', 'https://cdn-icons-png.flaticon.com/512/123/123309.png', 5.0);
addProduct('WATER', 'https://cdn-icons-png.flaticon.com/512/824/824239.png', 9.5);