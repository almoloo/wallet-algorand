const Tatum = require('@tatumio/tatum')
const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko()

const getPrice = async () => {
	try {
		let coinData = await CoinGeckoClient.coins.fetch('algorand')
		return coinData
	} catch (err) {
		return err
	}
}
module.exports = getPrice
