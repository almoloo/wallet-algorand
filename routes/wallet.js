const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/auth')
const usersCollection = require('../middlewares/db')
const getTransactions = require('../middlewares/gettransactions')
const getBalance = require('../middlewares/getbalance')
const getPrice = require('../middlewares/getprice')
const Tatum = require('@tatumio/tatum')
const { default: axios } = require('axios')

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
				amount: balance,
				fee: 0.001,
			},
		})
	}
})

// ----- GET ALGO PRICE
router.get('/price', async (req, res) => {
	const coinInfo = await getPrice()
	if (!coinInfo.success) {
		res.status(403).json(coinInfo.message)
	}
	const price = coinInfo.data['market_data']['current_price']['usd']
	const priceChange =
		coinInfo.data['market_data']['price_change_percentage_24h']
	res.json({
		success: true,
		data: {
			price: price,
			priceChange: priceChange,
		},
	})
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

// ----- SEND TRANSACTION
router.post('/send', authenticateToken, async (req, res) => {
	const { address, amount, username } = req.body
	const user = await usersCollection.where('username', '==', username).get()
	const rawUserData = user.docs[0].data()
	const wallet = rawUserData.wallet.address
	const privateKey = rawUserData.wallet.secret
	const accountBalance = await getBalance(wallet)
	if (accountBalance === NaN) {
		res.status(403).json({
			success: false,
			message: 'Error getting balance',
		})
	} else {
		const transactionData = {
			amount: amount.toString(),
			from: wallet,
			fromPrivateKey: privateKey,
			to: address,
			fee: '0.001',
			note: '',
		}
		axios({
			method: 'post',
			url: 'https://api-eu1.tatum.io/v3/algorand/transaction',
			headers: {
				'Content-Type': 'application/json',
				'X-API-KEY': process.env.TATUM_API_KEY,
			},
			data: transactionData,
		})
			.then((response) => {
				res.json({
					success: true,
					data: response.data,
				})
			})
			.catch((error) => {
				res.status(403).json({
					success: false,
					message: error,
				})
			})
	}
})

module.exports = router
