const fs = require('fs')

const list = fs
  .readFileSync('./list.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' - '))

const search = q => `https://google.com/search?q=${encodeURIComponent(q)}`
const link = v => `<a href="${search(v)}">${v}</a>`

console.log(`<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
<style>
ul { list-style-type: none; padding: 0; }
li { margin: 6px 0; }
</style>
<body>
<ul>
${list
  .map(([school, player]) => `<li>${link(school)}<br/>${link(player)}</li>`)
  .join('\n')}
</ul>
</body>
`)
