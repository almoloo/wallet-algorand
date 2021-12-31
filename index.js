require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('wwwroot'))

// ----- Routes
const accountRouter = require('./routes/account')
const walletRouter = require('./routes/wallet')
app.use('/api/account', accountRouter)
app.use('/api/wallet', walletRouter)

// ----- Views
const viewsRouter = require('./routes/views')
app.use('/', viewsRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`App is running on port ${port}.`)
})
