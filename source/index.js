const getInitialState = (
  isDevelopment = (() => process.env.NODE_ENV === `development`)()
) => ({
  isDevelopment,
  dependencies: {
    nightmare: require(`nightmare`)
  },
  nightmareOptions: {
    typeInterval: 1,
    waitTimeout: 45000,
    gotoTimeout: 45000,
    show: isDevelopment
  },
  useragent: (
    isDevelopment
    ? `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36`
    : `https://www.npmjs.com/package/consumption`
  )
})

const initialize = (
  state,
  { dependencies: { nightmare }, nightmareOptions, useragent } = state
) => Object.assign(
  {},
  state,
  {
    scraper: (
      nightmare(nightmareOptions)
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
  { scraper, showSubscriptions } = state
) => {
  const subscriptions = (
    showSubscriptions.length > 0
    ? showSubscriptions
    : (
      await scraper
      .goto(`https://www.tele2.se/mitt-tele2`)
      .evaluate(() =>
        Array
        .from(document.querySelectorAll(`#subscriptions [href*=subscriptionId]`))
        .map(a => a.search.replace(/\?subscriptionId=/, ``))
      )
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

const terminate = async (state, { scraper, isDevelopment } = state) => {
  await scraper.end()
  return isDevelopment ? state : state.dataBuckets
}

module.exports = async (
  options = (() => { throw Error(`missing options object`) })(),
  {
    email = (() => { throw Error(`missing email`) })(),
    password = (() => { throw Error(`missing password`) })(),
    showSubscriptions = []
  } = options
) =>
  [ initialize, login, getSubscriptions, getConsumption, terminate ]
  .reduce(
    async (nextState, operation) => {
      const state = await nextState
      return operation(state)
    },
    Object.assign({}, getInitialState(), options)
  )
