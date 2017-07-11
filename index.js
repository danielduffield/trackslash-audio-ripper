const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const request = require('request')
const express = require('express')
const app = express()

app.use(jsonParser)
app.use(express.static('public'))

app.post('/url-request', (req, res) => {
  checkYoutubeId(req.body.youtubeId)
    .then(response => {
      if (response.statusCode === 200) res.sendStatus(202)
      else res.sendStatus(400)
    })
})

app.listen(3000, () => console.log('Listening on 3000...'))

function checkYoutubeId(youtubeId) {
  return new Promise((resolve, reject) => {
    request.get('https://www.youtube.com/' + youtubeId, (err, response, body) => {
      if (err) return reject(new Error('Couldn\'t get Youtube video.'))
      return resolve(response)
    })
  })
}
