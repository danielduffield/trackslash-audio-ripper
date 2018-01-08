class AudioModule {
  constructor($player, tracklist) {
    this.player = $player
    this.isContinuous = false
    this.isShuffled = false
    this.tracklist = tracklist
    this.shuffled = tracklist
    this.current = tracklist[0]
    this.index = 0
    console.log($player, tracklist)
  }
  playNextTrack() {
    if (!this.isContinuous) return
    this.isShuffled
    ? console.log('Playing next track in shuffled')
    : console.log('Playing next unshuffled track')
  }
  shuffleTracklist() {
    const queued = this.tracklist.filter((track, index) => index !== this.index)
    this.shuffled = [this.current, ...shuffleArray(queued)]
    console.log(this.tracklist, this.shuffled)
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
