const express = require('express')
const authRoute=require('./routes/auth')
const categoryRoute=require('./routes/categoryRoute')
const productRoute=require('./routes/productRoute')
require('./database/database')
const dotenv=require('dotenv')

dotenv.config()

const app = express()
const port = 3000
app.use(express.json())
app.use('/api/user',authRoute)
app.use('/api/category',categoryRoute)
app.use('/api/product',productRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})