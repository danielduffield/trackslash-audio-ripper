const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const request = require('request')
const express = require('express')
const app = express()

app.use(jsonParser)
app.use(express.static('public'))

app.post('/url-request', (req, res) => {
  console.log(req.body.youtubeId)
  if (isValidYoutubeVideo(req.body.youtubeId)) {
    res.sendStatus(201)
  }
  else {
    res.sendStatus(404)
  }
})

app.listen(3000, () => console.log('Listening on 3000...'))

function isValidYoutubeVideo(youtubeId) {
  request.get('https://www.youtube.com/' + youtubeId, (err, response, body) => {
    if (err) return console.log(err)
    return response.statusCode === 200
  })
}
