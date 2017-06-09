const initialState = {
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
  state,
  { dependencies: { nightmare }, debug, nightmareOptions, useragent } = state
) => Object.assign(
  {},
  state,
  {
    scraper: (
      nightmare(Object.assign({}, nightmareOptions, { show: debug }))
      .useragent(useragent)
    )
  }
)

const login = async (
  state,
  { scraper, credentials: { email, password } } = state
) => Object.assign(
  {},
  state,
  {
    scraper: (
      scraper
      .goto(`https://www.tele2.se/LogOn/LogOn`)
      .type(`#loginForm\\.username`, email)
      .type(`#loginForm\\.password`, password)
      .click(`[value="Logga in"]`)
      .wait(`#subscriptions`)
    )
  }
)

const getSubscriptions = async (
  state,
  { scraper } = state
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
    state,
    { subscriptions }
  )
}

const getConsumption = async (
  state,
  { scraper, subscriptions } = state
) => {
  const dataBuckets = await subscriptions.reduce(
    async (buckets, msisdn) => {
      const bucket = (
        await scraper
        .goto(`https://www.tele2.se/mitt-tele2/RedirectToConsumptionPage?msisdn=${msisdn}`)
        .wait(`.bucket__body__data`)
        .goto(`https://www.tele2.se/t2api/consumptions/GetDataBuckets`)
        .evaluate(() => JSON.parse(document.querySelector(`body`).innerText))
      )
      return buckets.concat(Object.assign({}, { msisdn }, bucket))
    },
    []
  )

  return Object.assign(
    {},
    state,
    { dataBuckets }
  )
}

const end = async (state, { scraper } = state) => {
  await scraper.end()
  return state
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
  [ initialize, login, getSubscriptions, getConsumption, end ]
  .reduce(
    async (nextState, operation) => {
      const state = await nextState
      return operation(state)
    },
    Object.assign({}, initialState, options)
  )
