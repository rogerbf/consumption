export default ({ nightmare, credentials }) =>
  Promise.resolve({
    nightmare: (
      nightmare
      .goto(`https://www.tele2.se/LogOn/LogOn`)
      .type(`#loginForm\\.username`, credentials.username)
      .type(`#loginForm\\.password`, credentials.password)
      .click(`[value="Logga in"]`)
      .wait(`.t2-nav-nestedlist`)
    )
  })
