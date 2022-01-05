const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const usersCollection = require('../middlewares/db')
const getTransactions = require('../middlewares/gettransactions')
const { default: axios } = require('axios')

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
				const transactions = await getTransactions(
					userDB.docs[0].data().wallet.address
				)
				res.render('dashboard', {
					transactions: transactions,
					wallet: userDB.docs[0].data().wallet.address,
				})
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
