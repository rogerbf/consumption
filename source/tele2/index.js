import Nightmare from 'nightmare'
import setup from './setup'
import login from './login'
import getConsumption from './get-consumption'
import run from './run'
import tele2 from './tele2'

export default tele2.bind(
  null,
  { Nightmare, setup, login, getConsumption, run }
)
