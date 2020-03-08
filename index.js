const { get } = require('axios')
const cheerio = require('cheerio')

const baseUrl = 'https://www.basketball-reference.com/'

;(async () => {
  const res = await get(baseUrl + '/friv/colleges.fcgi')
  const $ = cheerio.load(res.data)

  const schools = $('option')
    .toArray()
    .map(el => ({ name: $(el).text(), url: baseUrl + $(el).attr('value') }))

  for (let i = 0; i < schools.length; i++) {
    const school = schools[i]
    const players = await getPlayers(school.url)
    if (players.length === 1) {
      console.log(school.name, '-', players[0])
    }
  }
})()

const getPlayers = async url => {
  const res = await get(url)
  const $ = cheerio.load(res.data)

  return $('table tbody tr a')
    .toArray()
    .filter(el =>
      $(el)
        .attr('href')
        .startsWith('/players/')
    )
    .map(el => $(el).text())
}
