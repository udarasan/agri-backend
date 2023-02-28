const router = require('express').Router();
const Product = require('../model/product')
const User = require('../model/user')
const verify = require('../middleware/verifyToken')

router.post('/addProduct', verify, async (req, res) => {

    const product = new Product({
        name: req.body.name,
        farmer: req.body.farmer,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        imageUrls: req.body.imageUrls,
        stockQuantity: req.body.stockQuantity,
        averageRating: req.body.averageRating
    })

    console.log(req.body.farmer)
    // existing email validation
    const farmerIdExist = await User.findOne({
        _id: req.body.farmer,
    })
    if (!farmerIdExist) return res.status(400).send('Farmer is Not Exist!')

    try {
        const saveProduct = await product.save()
        res.status(200).send(saveProduct)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }


})

router.get('/getAllProducts', verify, async (req, res) => {

    try {
        const allProducts = await Product.find()
        res.status(200).send(allProducts)
    } catch (e) {
        console.log(e)
        res.status(400).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }



})

module.exports = router;