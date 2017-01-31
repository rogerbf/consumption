export default ({ nightmare }) =>
  nightmare
  .goto(`https://www.tele2.se/mitt-tele2/forbrukning`)
  .wait(`.t2-usage`)
  .goto(`https://www.tele2.se/t2api/consumptions/GetBucketList`)
  .evaluate(() => document.querySelector(`body`).innerText)
  .then(consumptionData => {
    Object.assign(nightmare, { extracted: JSON.parse(consumptionData) })
  })
  .then(() => {
    return { nightmare }
  })
