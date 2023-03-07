const express = require('express')
const authRoute=require('./routes/auth')
const categoryRoute=require('./routes/categoryRoute')
const productRoute=require('./routes/productRoute')
const chatRoute=require('./routes/chatRoute')
const postRoute=require('./routes/postRoute')
const cartRoute=require('./routes/cartRoute')
require('./database/database')
const dotenv=require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(cors())
const port = 3005
app.use(express.json())
app.use('/api/user',authRoute)
app.use('/api/category',categoryRoute)
app.use('/api/product',productRoute)
app.use('/api/chat',chatRoute)
app.use('/api/post',postRoute)
app.use('/api/cart',cartRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})