const router = require('express').Router();
const Cart = require('../model/cart')
const User = require('../model/user')
const verify = require('../middleware/verifyToken')
router.post('/addCart', verify, async (req, res) => {

    const cart = new Cart({
        customer: req.body.customer,
        cartItems:req.body.cartItems
    })

    console.log(req.body.cartItems)
    console.log('hey i am here 1')
    // existing email validation
    const farmerIdExist = await User.findOne({
        _id: req.body.customer,
    })
    if (!farmerIdExist) return res.status(400).send('User is Not Exist!')

    try {
        //check user is available in cart collection
        const cartUserIsExist=await Cart.findOne({customer:req.body.customer})
        console.log(cartUserIsExist)
        if (!cartUserIsExist) {
            console.log('hey i am here 2')
            const saveCart = await cart.save()
            res.status(200).send(saveCart)
        }else {
            console.log('---------------------->')
            const customerId = req.body.customer;
            const cartItems = req.body.cartItems;

            const updatedCart = await Cart.updateOne(
                { customer: customerId },
                { $addToSet: { cartItems: { $each: cartItems } } }
            );

            res.status(200).json(updatedCart);
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.put('/carts/:customerId/products/:productId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const productId = req.params.productId;
        const quantity = req.body.quantity;

        const updatedCart = await Cart.updateOne(
            { customer: customerId, "cartItems.product": productId },
            { $set: { "cartItems.$.quantity": quantity } }
        );

        res.status(200).json(updatedCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('/getAllCart', verify, async (req, res) => {

    try {
        const allProducts = await Cart.findOne({ customer: req.body.customer })
        res.status(200).send(allProducts)
    } catch (e) {
        console.log(e)
        res.status(400).send({
            message:
                e.message || "Some error occurred while retrieving tutorials."
        });
    }



})

module.exports = router;

// router.put('/updateCart', async (req, res) => {
//     try {
//         const customerId = req.body.customer;
//         const cartItems = req.body.cartItems;
//
//         const updatedCart = await Cart.updateOne(
//             { customer: customerId },
//             { $addToSet: { cartItems: { $each: cartItems } } }
//         );
//
//         res.status(200).json(updatedCart);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });







/*router.put('/updateCart', verify, async (req, res) => {

    const cart = new Cart({
        customer: req.body.customer,
        cartItems:req.body.cartItems
    })


    try {
        //check user is available in cart collection
        const cartUserIsExist=await Cart.findOne({customer:req.body.customer})

        if (!cartUserIsExist) {
            console.log('hey i am here 2')
            const saveCart = await cart.save()
            res.status(200).send(saveCart)
        }else {
            //push
            console.log('-----------------------------------------');
            console.log(cartUserIsExist)
            const cartItems=cartUserIsExist.cartItems

            console.log('-----------------------------------------');
            console.log(cartItems)
            cartItems.push(req.body.cartItems[0])

            console.log('-----------------------------------------');
            console.log(cartItems)

            const filter = { customer:req.body.customer };
            const update = { $set: { product: req.body.cartItems[0] } };
            console.log('-----------------------------------------');
            console.log(update)

            const result = await cart.updateOne(filter, update);

            res.status(200).send(result)

            //update
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.put('/updateCarts/:id', verify, async (req, res) => {

    try {
        const { id } = req.params;
        const { cartItems } = req.body;

        const cart = await Cart.findByIdAndUpdate(
            id,
            { cartItems },
            { new: false }
        );

        res.json({ message: `Cart ${id} updated successfully`, cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})*/




