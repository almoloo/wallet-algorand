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
	if (user.empty) {
		res.sendStatus(401).json({
			success: false,
			message: 'User not found.',
		})
	}
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

module.exports = router
