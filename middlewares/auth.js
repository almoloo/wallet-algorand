const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
	const accountCookie = req.cookies.account
	if (token == null) {
		// return res.sendStatus(401)
		return res.redirect('/')
	}
	jwt.verify(accountCookie, process.env.TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403).redirect('/')
		req.user = user
		next()
	})
}

module.exports = authenticateToken
