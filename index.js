const express = require('express')
const authRoute=require('./routes/auth')
require('./database/database')
const dotenv=require('dotenv')

dotenv.config()

const app = express()
const port = 3000
app.use(express.json())
app.use('/api/user',authRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})