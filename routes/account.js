const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middlewares/auth')
const usersCollection = require('../middlewares/db')
const Tatum = require('@tatumio/tatum')
const QRCode = require('qrcode')

// ----- REGISTER USER
router.post('/register', async (req, res) => {
	// CHECK IF USERNAME IS PROVIDED IN REQUEST
	const username = req.body.username.toLowerCase()
	const password = req.body.password
	if (!username || !password) {
		res.status(400).json({
			success: false,
			message: 'Username and password are required.',
		})
	} else {
		// CHECK IF USERNAME DOESN'T ALREADY EXIST
		const user = await usersCollection.where('username', '==', username).get()
		if (user.empty) {
			// USERNAME DOESN'T EXIST, CREATE NEW USER
			const hashedSecret = bcrypt.hashSync(password, 10)
			const algoWallet = await Tatum.generateAlgoWallet()
			const newUser = await usersCollection.add({
				username: username,
				createdAt: new Date().toUTCString(),
				secret: hashedSecret,
				wallet: {
					address: algoWallet.address,
					secret: algoWallet.secret,
				},
				enabled: true,
			})
			const userObject = {
				id: newUser.id,
				username: username,
			}
			const accessToken = jwt.sign(userObject, process.env.TOKEN_SECRET)
			res
				.cookie('account', accessToken, { maxAge: 2600000000, httpOnly: true })
				.json({
					success: true,
					message: 'User created.',
					data: {
						username: username,
						token: accessToken,
					},
				})
		} else {
			// USERNAME ALREADY EXISTS
			res.status(400).json({
				success: false,
				message: 'Username already exists.',
			})
		}
	}
})

// ----- LOGIN USER
router.post('/login', async (req, res) => {
	// CHECK IF USERNAME & PASSWORD ARE PROVIDED IN REQUEST
	const username = req.body.username.toLowerCase()
	const password = req.body.password
	if (!username || !password) {
		res.status(400).json({
			success: false,
			message: 'Username and password are required.',
		})
	} else {
		// CHECK IF USERNAME EXISTS
		const user = await usersCollection.where('username', '==', username).get()
		if (user.empty) {
			res.status(400).json({
				success: false,
				message: 'Username does not exist.',
			})
		} else {
			// CHECK IF PASSWORD IS CORRECT
			const userData = user.docs[0].data()
			const secretIsValid = await bcrypt.compareSync(password, userData.secret)
			if (secretIsValid) {
				// SECRET IS CORRECT, LOG USER IN
				const userObject = {
					id: userData.id,
					username: userData.username,
					wallet: userData.wallet.address,
				}
				const accessToken = jwt.sign(userObject, process.env.TOKEN_SECRET)
				res
					.cookie('account', accessToken, {
						maxAge: 2600000000,
						httpOnly: true,
					})
					.json({
						success: true,
						message: 'User logged in.',
						data: {
							token: accessToken,
						},
					})
			} else {
				// SECRET IS INCORRECT
				res.status(400).json({
					success: false,
					message: 'Password is incorrect.',
				})
			}
		}
	}
})

// ----- LOGOUT USER
router.get('/logout', authenticateToken, (req, res) => {
	res.clearCookie('account').redirect('/')
})

// ----- GET USER
router.post('/info', authenticateToken, async (req, res) => {
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
	const rawUser = user.docs[0].data()
	const userData = {
		id: rawUser.id,
		username: rawUser.username,
		enabled: rawUser.enabled,
		address: rawUser.wallet.address,
		qr: await QRCode.toDataURL(rawUser.wallet.address),
		currencies: ['algo'],
	}
	res.json(userData)
})

module.exports = router
