const socket = require('./../utils/socketConnection')

const state = {
  elementRefs: {},
  demo: true,
  listeners: {},
  selectedTrack: null,
  tracklist: null,
  slicingInitialized: false,
  currentTrack: 2,
  albumMetadata: {},
  audio: null,
  socketId: null,
  socket
}

module.exports = state
