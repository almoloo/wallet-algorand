const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/auth')
const usersCollection = require('../middlewares/db')
const getTransactions = require('../middlewares/gettransactions')
const Tatum = require('@tatumio/tatum')
const { default: axios } = require('axios')

// ----- GET USER BALANCE
router.get('/balance', authenticateToken, async (req, res) => {
	// GET USER DATA FROM DATABASE
	const user = await usersCollection
		.where('username', '==', req.user.username)
		.get()
	const rawUserData = user.docs[0].data()
	try {
		const accountBalance = await Tatum.algorandGetAccountBalance(
			rawUserData.wallet.address
		)
		if (accountBalance.error) throw accountBalance.error
		res.json({
			success: true,
			data: {
				amount: accountBalance,
				unit: 1,
				fee: 0,
			},
		})
	} catch (err) {
		res.status(403).json({
			success: false,
			message: err,
		})
	}
})

// ----- GET USER TRANSACTIONS
router.get('/transactions', authenticateToken, async (req, res) => {
	const next = req.query.next
	const wallet = req.query.wallet
	try {
		const transactions = await getTransactions(wallet, 50, next)
		res.json({
			success: true,
			data: transactions,
		})
	} catch (err) {
		res.status(403).json({
			success: false,
			message: err,
		})
	}
})

module.exports = router
