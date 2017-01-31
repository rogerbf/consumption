import Nightmare from 'nightmare'
import setup from './setup'
import login from './login'
import getConsumption from './get-consumption'
import run from './run'

export default credentials =>
  setup({
    Nightmare,
    debug: process.env.debug === `consumption`,
    credentials
  })
  .then(login)
  .then(getConsumption)
  .then(run)
