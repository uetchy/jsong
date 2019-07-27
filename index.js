const express = require('express')
const helmet = require('helmet')
const google = require('google')
const app = express()

app.use(helmet())

app.get('*', async (req, res) => {
  const query = req.query.query || req.query.q

  if (!query) {
    return res.json({ error: 'no query' })
  }

  const params = {
    tld: req.query.tld || 'com',
    lang: req.query.lang || 'en',
  }

  const links = await googlePromise(query, params)

  res.json({ params: { query, ...params }, links })
})

function googlePromise(query, { tld, lang }) {
  return new Promise((resolve, reject) => {
    google.tld = tld
    google.lang = lang
    google.resultsPerPage = 25

    google(query, (err, res) => {
      if (err) return reject(err)
      resolve(res.links)
    })
  })
}

module.exports = app
