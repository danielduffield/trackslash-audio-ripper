require('dotenv').config()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const request = require('request')
const fs = require('fs-extra')
const path = require('path')
const getMetadata = require('./utils/getMetadata.js')
const processMetadata = require('./utils/processMetadata.js')
const downloadAlbum = require('./utils/downloadAlbum.js')
const sliceTracklist = require('./utils/sliceTracklist.js')
const compressTracklist = require('./utils/compressTracklist')
const { express, app, server, io } = require('./utils/serverApp')
const removeExpired = require('./utils/removeExpired.js')
const populateQueue = require('./utils/populateQueue.js')
const findExpired = require('./utils/findExpired.js')
const updateQueue = require('./utils/updateQueue.js')
const ensureDirs = require('./utils/ensureDirs.js')

const minutes = 60 * 1000

let queue = {}
findExpired(path.join(__dirname, './downloaded')).then(results => {
  removeExpired(results.expired)
  queue = populateQueue(results.active)
})

setInterval(() => {
  queue = updateQueue(queue)
}, 5 * minutes)

app.use(jsonParser)
app.use(express.static('server/public'))
app.use('/download', express.static('server/downloaded'))

app.get('/meta-image.png', (req, res) => {
  fs.readFile('server/public/images/trackslash-meta-image.png').then(imageData => {
    res.contentType('image/png')
    res.send(imageData)
  })
})

app.post('/url-request', (req, res) => {
  checkYoutubeId(req.body.youtubeId)
    .then(response => {
      if (response.statusCode === 200) {
        const requestedUrl = 'https://www.youtube.com/' + req.body.youtubeId
        getMetadata(requestedUrl)
          .then(data => {
            const keyData = processMetadata(data)
            res.status(202).json(keyData)
            const timeLimit = 20 * minutes
            ensureDirs(keyData, req.body.socketId).then(() => {
              if (queue[keyData.videoId]) {
                queue[keyData.videoId].expiration = Date.now() + timeLimit
                io.to(req.body.socketId).emit('downloadProgress', 100)
              }
              else queue[keyData.videoId] = { dl: downloadAlbum(requestedUrl, keyData, req.body.socketId), expiration: Date.now() + timeLimit }
            })
            return true
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

app.post('/tracklist-request', (req, res) => {
  console.log(req.body)
  const tracklist = req.body.tracklist
  const metaData = req.body.metaData
  const socketId = req.body.socketId
  handleTracklistSubmit(socketId, metaData, tracklist)
  res.sendStatus(202)

  /*

  queue[metaData.videoId].dl.then(() => {
    return Promise.all(sliceTracklist(tracklist, metaData, socketId))
  })
  .then(() => {
    return compressTracklist(metaData.videoId, socketId)
  })
  .then(path => {
    res.status(201).json(path)
  })
  .catch((err) => {
    console.log(err)
  })

  */
})

server.listen(process.env.PORT, () => console.log('Listening on PORT...'))

function checkYoutubeId(youtubeId) {
  return new Promise((resolve, reject) => {
    request.get('https://www.youtube.com/' + youtubeId, (err, response, body) => {
      if (err) return reject(new Error('Couldn\'t get Youtube video.'))
      return resolve(response)
    })
  })
}

io.sockets.on('connection', newConnection)

function newConnection(socket) {
  console.log('User ' + socket.id + ' connected')
  socket.emit('connectionId', socket.id)
}

function handleTracklistSubmit(socketId, metaData, tracklist) {
  queue[metaData.videoId].dl.then(() => {
    return Promise.all(sliceTracklist(tracklist, metaData, socketId))
  })
  .then(() => {
    compressTracklist(metaData.videoId, socketId).then(zipPath => {
      io.to(socketId).emit('zipPath', zipPath)
    })
  })
  .catch((err) => {
    console.log(err)
  })
}
