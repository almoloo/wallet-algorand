require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
app.set('view engine', 'ejs')

// ----- Routes
const accountRouter = require('./routes/account')
const walletRouter = require('./routes/wallet')
app.use('/account', accountRouter)
app.use('/wallet', walletRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`App is running on port ${port}.`)
})
