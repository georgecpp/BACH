const router = require('express').Router();
const { json } = require('express/lib/response');
const Product = require('../model/Product');

router.get('/', (req, res) => {
    
    var productsArr = [];
    // get all the products from db
    Product.find({}, function(err, products) {

        products.forEach(function(product) {
            productsArr.push(product);
        });

        res.status(200).send(productsArr);
    });
});

router.get('/byNames', (req, res) => {

    const names = req.body.names;
    if(names) {  
        var productsArr = [];
        Product.find({}, function(err, products) {
            products.forEach(function(product) {
                if(names.includes(product.title)) {
                    productsArr.push(product);
                }
            });
    
            res.status(200).send(productsArr);
        });
    }
    else {
        return res.status(404).send('Couldn\'t get the names of the products');
    }
    
});

module.exports = router;