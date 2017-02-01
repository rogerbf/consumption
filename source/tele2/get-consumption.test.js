import getConsumption from './get-consumption'

global.document = {
  querySelector: jest.fn(() => ({
    innerText: `{ "hello": "is it me you are looking for" }`
  }))
}

test(`resolves`, () => {
  const nightmare = {
    goto: jest.fn(() => nightmare),
    wait: jest.fn(() => nightmare),
    evaluate: jest.fn(fn => Promise.resolve(fn()))
  }

  getConsumption({ nightmare, extracted: {} })
  .then(instance => {
    expect(instance).toEqual({
      nightmare,
      extracted: { consumption: { hello: `is it me you are looking for` } }
    })
    expect(nightmare.goto)
    .toHaveBeenCalledWith(`https://www.tele2.se/mitt-tele2/forbrukning`)

    expect(nightmare.goto)
    .toHaveBeenCalledWith(`https://www.tele2.se/t2api/consumptions/GetBucketList`)

    expect(nightmare.wait)
    .toHaveBeenCalledWith(`.t2-usage`)

    expect(typeof (nightmare.evaluate.mock.calls[0][0]))
    .toBe(`function`)
  })
  .catch(error => expect(error).toBeUndefined())
})
