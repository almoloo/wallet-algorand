const Tatum = require('@tatumio/tatum')

const getBalance = async (address) => {
	try {
		const accountBalance = await Tatum.algorandGetAccountBalance(address)
		if (accountBalance.error) throw accountBalance.error
		return accountBalance
	} catch (err) {
		return NaN
	}
}
module.exports = getBalance
