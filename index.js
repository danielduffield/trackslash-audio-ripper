const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
const app = express()

app.use(jsonParser)
app.use(express.static('public'))

app.post('/url-request', (req, res) => {
  console.log(req.body)
  res.sendStatus(201)
})

app.listen(3000, () => console.log('Listening on 3000...'))
