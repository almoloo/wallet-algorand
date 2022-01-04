const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const usersCollection = require('../middlewares/db')

// ----- Welcome
router.get('/', (req, res) => {
	const accountCookie = req.cookies.account
	if (accountCookie) {
		try {
			jwt.verify(accountCookie, process.env.TOKEN_SECRET, async (err, user) => {
				if (err) throw err
				const userDB = await usersCollection
					.where('username', '==', user.username)
					.get()
				if (userDB.empty || !userDB.docs[0].data().enabled) {
					res.clearCookie('account').render('welcome')
				}
				res.render('dashboard')
			})
		} catch (err) {
			res.clearCookie('account').render('welcome')
		}
	} else {
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
