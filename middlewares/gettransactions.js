const { default: axios } = require('axios')

const getTransactions = async (address, limit, next) => {
	const transactions = await axios({
		method: 'get',
		url: `https://algoindexer.testnet.algoexplorerapi.io/v2/accounts/${address}/transactions?limit=${
			limit ? limit : '50'
		}${next ? `&next=${next}` : ''}`,
	})
	const transactionsData = []
	transactions.data.transactions.forEach((transaction) => {
		if (transaction['tx-type'] === 'pay') {
			transactionsData.push({
				id: transaction.id,
				fee: transaction.fee,
				amount: transaction['payment-transaction'].amount,
				type: transaction.sender === address ? 'out' : 'in',
				date: transaction['round-time'],
				sender: transaction.sender,
				recipient: transaction['payment-transaction'].receiver,
			})
		}
	})
	const responseData = {}
	if (transactions.data['next-token']) {
		responseData.next = transactions.data['next-token']
	}
	responseData.data = transactionsData
	return responseData
}
module.exports = getTransactions
