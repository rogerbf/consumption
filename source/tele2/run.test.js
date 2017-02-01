import run from './run'

test(`run`, () => {
  const extracted = { some: `data` }
  const nightmare = {
    end: jest.fn(() => Promise.resolve(extracted))
  }

  run({ nightmare, extracted })
  .then(data => expect(data).toBe(extracted))
  .catch(error => expect(error).toBeUndefined())
})
