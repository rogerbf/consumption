const configuration = {
  dependencies: {
    nightmare: require(`nightmare`)
  },
  debug: process.env.DEBUG === `consumption`,
  nightmareOptions: {
    typeInterval: 1,
    waitTimeout: 45000,
    gotoTimeout: 45000
  },
  useragent: (
    process.env.NODE_ENV === `development`
    ? `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36`
    : `https://www.npmjs.com/package/consumption`
  )
}

const initialize = (
  configuration,
  { dependencies: { nightmare }, debug, nightmareDefaultOptions, useragent }
) =>
  Object.assign(
    {},
    configuration,
    {
      scraper: (
        nightmare(Object.assign({}, nightmareDefaultOptions, { show: debug }))
        .useragent(useragent)
      )
    }
  )

// login
// fetch subscriptions
// select subscription, default to all
// get consumption

module.exports = () => {}
