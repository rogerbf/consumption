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
  { dependencies: { nightmare }, debug, nightmareOptions, useragent } = configuration
) => Object.assign(
  {},
  configuration,
  {
    scraper: (
      nightmare(Object.assign({}, nightmareOptions, { show: debug }))
      .useragent(useragent)
    )
  }
)

const login = async (
  configuration,
  { scraper, credentials: { email, password } } = configuration
) => Object.assign(
  {},
  configuration,
  {
    scraper: (
      scraper
      .goto(`https://www.tele2.se/LogOn/LogOn`)
      .type(`#loginForm\\.username`, email)
      .type(`#loginForm\\.password`, password)
      .click(`[value="Logga in"]`)
      // .wait(`.t2-nav-nestedlist`)
      .wait(`#subscriptions`)
    )
  }
)

const getSubscriptions = async (
  configuration,
  { scraper } = configuration
) => {
  const subscriptions = (
    await scraper
    .goto(`https://www.tele2.se/mitt-tele2`)
    .evaluate(() =>
      Array
      .from(document.querySelectorAll(`#subscriptions [href*=subscriptionId]`))
      .map(a => a.search.replace(/\?subscriptionId=/, ``))
    )
  )
  return Object.assign(
    {},
    configuration,
    { subscriptions }
  )
}

const run = async (configuration, { scraper } = configuration) => {
  await scraper.end()
  return configuration
}

// login
// fetch subscriptions
// select subscription, default to all
// get consumption

module.exports = async (
  options = {
    credentials: {
      email: undefined,
      password: undefined
    }
  },
  {
    credentials: {
      email = undefined,
      password = undefined
    }
  } = options
) =>
  [ initialize, login, getSubscriptions, run ]
  .reduce(
    async (instance, next) => {
      const intermediate = await instance
      return next(intermediate)
    },
    Promise.resolve(Object.assign({}, configuration, options))
  )
