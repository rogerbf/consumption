export default ({ nightmare, credentials, ...configuration }) =>
  (
    credentials &&
    credentials.username !== undefined &&
    credentials.password !== undefined
    ? Promise.resolve(credentials)
    : Promise.reject(`missing credentials`)
  )
  .then(credentials => ({
    ...configuration,
    nightmare: (
      nightmare
      .goto(`https://www.tele2.se/LogOn/LogOn`)
      .type(`#loginForm\\.username`, credentials.username)
      .type(`#loginForm\\.password`, credentials.password)
      .click(`[value="Logga in"]`)
      .wait(`.t2-nav-nestedlist`)
    )
  }))
