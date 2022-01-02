const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')

// ----- Welcome
router.get('/', (req, res) => {
	const accountCookie = req.cookies.account
	if (accountCookie) {
	} else {
		res.render('welcome')
	}
})

// ----- Login
router.get('/login', (req, res) => {
	res.render('login')
})

// ----- Register
router.get('/register', (req, res) => {
	res.render('register')
})

module.exports = router
