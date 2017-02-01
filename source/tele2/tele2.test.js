import tele2 from './tele2'

test(`tele2`, () => {
  const setup = jest.fn(() => Promise.resolve())
  const login = jest.fn(() => Promise.resolve())
  const getConsumption = jest.fn(() => Promise.resolve())
  const run = jest.fn(() => Promise.resolve(`data`))

  tele2({ setup, login, getConsumption, run })
  .then(data => expect(data).toEqual(`data`))
  .catch(error => expect(error).toBeUndefined())
})
