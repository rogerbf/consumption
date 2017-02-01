export default ({ nightmare, extracted }) =>
  nightmare.end().then(() => extracted)
