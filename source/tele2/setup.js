export default ({ Nightmare, debug, credentials }) =>
  Promise.resolve({
    nightmare: (
      Nightmare({ show: debug, typeInterval: 1 })
      .useragent(
        debug
        ? `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36`
        : `https://www.npmjs.com/package/consumption`
      )
    ),
    credentials
  })
