export default (
  { Nightmare, setup, login, getConsumption, run },
  credentials
) =>
  setup({
    Nightmare,
    credentials,
    extracted: {},
    debug: process.env.DEBUG === `consumption`
  })
  .then(login)
  .then(getConsumption)
  .then(run)
