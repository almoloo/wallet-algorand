const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/auth')
const usersCollection = require('../middlewares/db')
const Tatum = require('@tatumio/tatum')

// ----- GET USER BALANCE
router.get('/balance', authenticateToken, async (req, res) => {
	// GET USER DATA FROM DATABASE
	const user = await usersCollection
		.where('username', '==', req.user.username)
		.get()
	const rawUserData = user.docs[0].data()
	const accountBalance = await Tatum.algorandGetAccountBalance(
		rawUserData.wallet.address
	)
	res.json({
		success: true,
		data: {
			amount: accountBalance,
			unit: 1,
			fee: 0,
		},
	})
})

// ----- GET USER TRANSACTIONS
router.get('/transactions', authenticateToken, async (req, res) => {
	// console.log(req.cookies.testnet)
	const user = await usersCollection
		.where('username', '==', req.user.username)
		.get()
	const rawUserData = user.docs[0].data()
	// console.log(Tatum)
	// res.json(rawUserData)
	const transactions = await Tatum.algorandGetTransactionsCount(
		rawUserData.wallet.address
	)
	res.send(transactions)
})

module.exports = router
