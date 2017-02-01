import login from './login'

test(`reject when credentials are missing or incomplete`, () => {
  login({})
  .then(credentials => expect(credentials).toBeUndefined())
  .catch(error => expect(error).toEqual(`missing credentials`))

  login({ credentials: { username: `popeye` } })
  .then(credentials => expect(credentials).toBeUndefined())
  .catch(error => expect(error).toEqual(`missing credentials`))

  login({ credentials: { password: `spinach` } })
  .then(credentials => expect(credentials).toBeUndefined())
  .catch(error => expect(error).toEqual(`missing credentials`))
})

test(`resolves`, () => {
  const nightmare = {
    goto: jest.fn(() => nightmare),
    type: jest.fn(() => nightmare),
    click: jest.fn(() => nightmare),
    wait: jest.fn(() => nightmare)
  }
  const credentials = { username: `popeye`, password: `spinach` }

  login({ nightmare, credentials })
  .then(instance => {
    expect(instance).toEqual({ nightmare })

    expect(nightmare.goto)
    .toHaveBeenCalledWith(`https://www.tele2.se/LogOn/LogOn`)

    expect(nightmare.type)
    .toHaveBeenCalledWith(`#loginForm\\.username`, credentials.username)

    expect(nightmare.type)
    .toHaveBeenCalledWith(`#loginForm\\.password`, credentials.password)

    expect(nightmare.click).toHaveBeenCalledWith(`[value="Logga in"]`)
    expect(nightmare.wait).toHaveBeenCalledWith(`.t2-nav-nestedlist`)
  })
  .catch(error => expect(error).toBeUndefined())
})
