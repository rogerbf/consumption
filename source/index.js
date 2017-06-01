const nightmare = require(`nightmare`)

const debug = process.env.DEBUG === `consumption`

const nightmareOptions = {
  show: debug,
  typeInterval: 1,
  waitTimeout: 45000,
  gotoTimeout: 45000
}

const tele2 = (
  credentials = { email: undefined, password: undefined },
  state = {
    credentials,
    nightmare: (
      nightmare(nightmareOptions)
      .useragent(
        debug
        ? `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36`
        : `https://www.npmjs.com/package/consumption`
      )
    )
  }
) => {
}

// login
// fetch subscriptions
// select subscription, default to all
// get consumption

module.exports = tele2
