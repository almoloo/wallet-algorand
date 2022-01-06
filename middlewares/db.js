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
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY)
const { JsonWebTokenError } = require('jsonwebtoken')
initializeApp({
	credential: cert(serviceAccount),
})
const db = getFirestore()
const usersCollection = db.collection('users')

module.exports = usersCollection
