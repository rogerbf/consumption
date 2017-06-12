# consumption

Fetches current subscription data usage from [Mitt Tele2](https://www.tele2.se/mitt-tele2).

## usage

```javascript
const consumption = require(`consumption`)

consumption({
  email: `user@example.com`,
  password: `vinternoll2`
})
.then(dataBuckets => console.log(JSON.stringify(dataBuckets, null, 2)))
.catch(error => console.error(error))
```

## api

### `consumption(options)`

- `options` &lt;Object&gt;, must contain: `email` and `password`. Can optionally contain `subscriptions`
  - `email` &lt;String&gt;, ***required***
  - `password` &lt;String&gt;, ***required***
  - `subscriptions` &lt;Array&gt;, filter subscriptions
