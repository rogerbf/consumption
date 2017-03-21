import setup from './setup'

test(`setup with debug`, () => {
  expect(typeof (setup)).toBe(`function`)
  const instance = jest.fn()
  const useragent = jest.fn(() => (instance))
  const Nightmare = jest.fn(() => ({ useragent }))
  setup({ Nightmare, debug: true })
  .then(nightmare => {
    expect(Nightmare).toHaveBeenCalledWith({
      show: true,
      typeInterval: 1,
      waitTimeout: 45000,
      gotoTimeout: 45000
    })
    expect(useragent).toHaveBeenCalledWith(
      `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36`
    )
    expect(nightmare).toEqual({ nightmare: instance, credentials: undefined })
  })
  .catch(error => expect(error).toBeUndefined())
})

test(`setup without debug`, () => {
  expect(typeof (setup)).toBe(`function`)
  const instance = jest.fn()
  const useragent = jest.fn(() => (instance))
  const Nightmare = jest.fn(() => ({ useragent }))
  setup({ Nightmare, debug: false })
  .then(nightmare => {
    expect(Nightmare).toHaveBeenCalledWith({
      show: false,
      typeInterval: 1,
      waitTimeout: 45000,
      gotoTimeout: 45000
    })
    expect(useragent).toHaveBeenCalledWith(
      `https://www.npmjs.com/package/consumption`
    )
    expect(nightmare).toEqual({ nightmare: instance, credentials: undefined })
  })
  .catch(error => expect(error).toBeUndefined())
})
