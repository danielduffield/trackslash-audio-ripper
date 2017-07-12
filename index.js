const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const request = require('request')
const express = require('express')
const app = express()
const getMetadata = require('./getMetadata.js')
const processMetadata = require('./processMetadata')

app.use(jsonParser)
app.use(express.static('public'))

app.post('/url-request', (req, res) => {
  checkYoutubeId(req.body.youtubeId)
    .then(response => {
      if (response.statusCode === 200) {
        getMetadata('https://www.youtube.com/' + req.body.youtubeId)
          .then(data => {
            const keyData = processMetadata(data)
            return res.status(202).json(keyData)
          })
          .catch(err => console.log(err))
      }
      else {
        res.status(400).json({error: 'Bad Request'})
      }
    })
    .catch(error => {
      console.log(new Error(error))
      res.sendStatus(500)
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
