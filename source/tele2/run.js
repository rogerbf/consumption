export default ({ nightmare }) =>
  nightmare.end().then(() => nightmare.extracted)
