const router = require('express').Router();
const Chat = require('../model/chat')
const User = require('../model/user')
const verify = require('../middleware/verifyToken')

router.post('/sendMessage', verify, async (req, res) => {

    const chat   = new Chat({
        message: req.body.message,
        sender: req.body.sender,
        receiver: req.body.receiver,
    })

    try {
        const saveMessage = await chat.save()
        res.status(200).send(saveMessage)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }


})

router.get('/getMessages', verify, async (req, res) => {

    try {
        const allMessagesByIds = await Chat.find({ sender: req.body.sender,receiver: req.body.receiver  })
        res.status(200).send(allMessagesByIds)
    } catch (e) {
        console.log(e)
        res.status(400).send({
            message:
                e.message || "Some error occurred while retrieving tutorials."
        });
    }



})

module.exports = router;