# ALGOWALLET
##### A custodial Algorand wallet using Tatum's API built on node.js with express.
[View online demo on heroku(testnet)](https://algo-wallet.herokuapp.com)

![wallet-algorand](/screenshots/hero.png)
> This project was developed for a [30-day contest on gitcoin](https://gitcoin.co/issue/algorandfoundation/grow-algorand/122/100027180). It was not tested thoroughly and is in no way suitable for production use. Please use with caution!
---
### Mobile screenshots
<div style="display:flex">
  <img src="/screenshots/1.Welcome.png" alt="Welcome page" width="18%" />
  <img src="/screenshots/4.Wallet.png" alt="Wallet" width="18%" />
  <img src="/screenshots/5.Receive.png" alt="Receive modal" width="18%" />
  <img src="/screenshots/6.Send.png" alt="Send modal" width="18%" />
  <img src="/screenshots/7.Transaction.png" alt="Transaction information modal" width="18%" />
</div>

---
### Services used in the project
* [Firebase Firestore](https://firebase.google.com) was used as database as it's simple to integrate and fast to work with.
* [Tatum API and SDK](https://tatum.io/) were used for the core functionality(e.g. Generating wallets, Getting wallet balance, transfering funds to another address...)
* [algoexplorer.io](https://algoexplorer.io) API was used to retrieve all previous transactions for a given address. Tatum lacked this functionality.
* [CoinGecko API](https://www.coingecko.com/en/api) was used to retrieve current price and daily change for ALGO.

### Environmental variables
* PORT: The port you want the project to be run at
* TOKEN_SECRET & REFRESH_SECRET: A random piece of string used to hash passwords
* TATUM_API_KEY & TATUM_API_URL: You can aquire api key and url from your Tatum dashboard
* FIREBASE_KEY: The service account object you aquired from firebase settings section

### License
Distributed under the MIT License. See [LICENSE](/LICENSE) for more information.

### Contact
Should you have any questions, feel free to reach me at [amousavig@icloud.com](mailto:amousavig@icloud.com)
