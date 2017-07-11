const express = require('express')
const app = express()

app.get('/index.html', (req, res) => {
  res.send('Homepage')
})

app.listen(3000, () => console.log('Listening on 3000...'))
