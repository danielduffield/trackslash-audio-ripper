const updateSelectedRender = require('./../utils/updateSelectedRender.js')

class AudioModule {
  constructor($player, $nowPlaying, tracklist, path) {
    this.player = $player
    this.nowPlaying = $nowPlaying
    this.isContinuous = false
    this.isShuffled = false
    this.tracklist = tracklist
    this.shuffled = tracklist
    this.current = tracklist[0]
    this.index = 0
    this.path = path
    this.listener = $player.addEventListener('ended', () => this.isContinuous
      ? this.skipTrack()
      : false)

    this.toggleSetting = this.toggleSetting.bind(this)
    this.selectTrack = this.selectTrack.bind(this)
    this.skipTrack = this.skipTrack.bind(this)
    this.shuffleTracklist = this.shuffleTracklist.bind(this)
    this.updateNowPlaying = this.updateNowPlaying.bind(this)
  }
  selectTrack(track) {
    const selectedIndex = this.tracklist.findIndex(trk => trk.trackName === track.trackName)
    this.current = this.tracklist[selectedIndex]
    this.index = selectedIndex
    if (this.isShuffled) this.shuffleTracklist()
    this.updateNowPlaying()
  }
  skipTrack(isBackward) {
    if ((!isBackward && this.index === this.tracklist.length - 1) ||
      (isBackward && this.index === 0)) return
    const nextIndex = isBackward ? this.index - 1 : this.index + 1
    this.current = this.isShuffled ? this.shuffled[nextIndex] : this.tracklist[nextIndex]
    this.index = nextIndex

    this.player.pause()
    this.updateNowPlaying()
    this.player.src = this.path + this.current.trackName.split(' ').join('-') + '.mp3'
    this.player.play()
  }
  shuffleTracklist() {
    const queued = this.tracklist.filter((track, index) => index !== this.index)
    this.shuffled = [this.current, ...shuffleArray(queued)]
    this.index = 0
  }
  toggleSetting(setting) {
    switch (setting) {
      case 'shuffle':
        if (!this.isShuffled) this.shuffleTracklist()
        else this.index = this.tracklist.findIndex(track => track.trackName === this.current.trackName)
        this.isShuffled = !this.isShuffled
        break
      case 'continuous':
        this.isContinuous = !this.isContinuous
        break
    }
  }
  updateNowPlaying() {
    updateSelectedRender(this.tracklist, this.current)
    this.nowPlaying.textContent = this.current.trackName
  }
}

function shuffleArray(array) {
  let shuffled = array.slice()
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled
}

module.exports = AudioModule
