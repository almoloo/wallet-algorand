// ----- FIRESTORE INITIALIZATION
const {
	initializeApp,
	applicationDefault,
	cert,
} = require('firebase-admin/app')
const {
	getFirestore,
	Timestamp,
	FieldValue,
} = require('firebase-admin/firestore')
const serviceAccount = require('../wallet-algo-firebase-adminsdk-hdbms-0a6a6071f5.json')
const { JsonWebTokenError } = require('jsonwebtoken')
initializeApp({
	credential: cert(serviceAccount),
})
const db = getFirestore()
const usersCollection = db.collection('users')

module.exports = usersCollection
