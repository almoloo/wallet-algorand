const jwt = require('jsonwebtoken')
const usersCollection = require('../middlewares/db')

function authenticateToken(req, res, next) {
	const accountCookie = req.cookies.account
	if (accountCookie == null) {
		return res.sendStatus(401).redirect('/')
	}
	jwt.verify(accountCookie, process.env.TOKEN_SECRET, async (err, user) => {
		if (err) return res.sendStatus(403).redirect('/')
		const userDB = await usersCollection
			.where('username', '==', user.username)
			.get()
		if (userDB.empty || !userDB.docs[0].data().enabled) {
			return res.sendStatus(403).redirect('/')
		}
		req.user = user
		next()
	})
}

module.exports = authenticateToken
