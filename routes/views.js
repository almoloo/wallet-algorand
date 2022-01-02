const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// ----- Welcome
router.get('/', (req, res) => {
	const accountCookie = req.cookies.account
	try {
		jwt.verify(accountCookie, process.env.TOKEN_SECRET, (err, user) => {
			if (err) {
				throw err
			} else {
				res.send('logged in')
			}
		})
	} catch (err) {
		res.render('welcome')
	}
})

// ----- Login
router.get('/login', (req, res) => {
	const accountCookie = req.cookies.account
	try {
		jwt.verify(accountCookie, process.env.TOKEN_SECRET, (err, user) => {
			if (err) {
				throw err
			} else {
				res.redirect('/')
			}
		})
	} catch (err) {
		res.render('login')
	}
})

// ----- Register
router.get('/register', (req, res) => {
	const accountCookie = req.cookies.account
	try {
		jwt.verify(accountCookie, process.env.TOKEN_SECRET, (err, user) => {
			if (err) {
				throw err
			} else {
				res.redirect('/')
			}
		})
	} catch (err) {
		res.render('register')
	}
})

module.exports = router
