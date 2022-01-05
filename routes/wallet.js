const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/auth')
const usersCollection = require('../middlewares/db')
const getTransactions = require('../middlewares/gettransactions')
const getBalance = require('../middlewares/getbalance')
const Tatum = require('@tatumio/tatum')

// ----- GET USER BALANCE
router.get('/balance', authenticateToken, async (req, res) => {
	const user = await usersCollection
	.where('username', '==', req.user.username)
	.get()
	const rawUserData = user.docs[0].data()
	const balance = await getBalance(rawUserData.wallet.address)
	if (balance === NaN) {
		res.status(403).json({
			success: false,
			message: 'Error getting balance',
		})
	} else {
		res.json({
			success: true,
			data: {
				amount: accountBalance,
				unit: 1,
				fee: 0,
			},
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
