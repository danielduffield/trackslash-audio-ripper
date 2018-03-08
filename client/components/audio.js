const { addLoadRef } = require('./../state/elementRefs')
const createElement = require('./../utils/createElement')

class Audio {
  constructor() {
    this.player = null
    this.nowPlaying = null
    this.isContinuous = false
    this.isShuffled = false
    this.tracklist = null
    this.shuffled = null
    this.current = null
    this.index = 0
    this.path = null

    this.toggleSetting = this.toggleSetting.bind(this)
    this.selectTrack = this.selectTrack.bind(this)
    this.skipTrack = this.skipTrack.bind(this)
    this.shuffleTracklist = this.shuffleTracklist.bind(this)
    this.updateNowPlaying = this.updateNowPlaying.bind(this)
  }
  exportPlayerRefs() {
    const $audioPlayer = this.player
    const $nowPlaying = this.nowPlaying
    return { $audioPlayer, $nowPlaying }
  }

  loadTracklistData(tracklist, path) {
    this.tracklist = tracklist
    this.shuffled = tracklist
    this.current = tracklist[0]
    this.path = path
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
    this.nowPlaying.textContent = this.current.trackName
    this.updateSelectedRender(this.tracklist, this.current)
  }

  updateSelectedRender(tracklist, selected) {
    const selectedIndex = tracklist.findIndex(track => track.trackName === selected.trackName)
    if (selectedIndex === -1) return
    this.resetSelected(tracklist.length)
    const $selected = addLoadRef(`track-final-${selectedIndex + 1}`)
    $selected.classList.add('selected')
  }

  resetSelected(tracklistLength) {
    for (let i = 1; i <= tracklistLength; i++) {
      const $track = addLoadRef(`track-final-${i}`)
      if ($track.classList.value.includes('selected')) $track.classList.remove('selected')
    }
  }

  renderNowPlaying() {
    return (
      createElement('div', { id: 'now-playing-container' }, ' ', [
        ['span', { id: 'now-playing' }]
      ])
    )
  }

  renderAudioPlayer() {
    const $audioPlayer = createElement('audio', { id: 'audio-player', controls: '', controlsList: 'nodownload', src: '' })
    $audioPlayer.addEventListener('ended', () => this.isContinuous ? this.skipTrack() : false)
    $audioPlayer.addEventListener('contextmenu', e => e.preventDefault())

    return (
      $audioPlayer
    )
  }

  render() {
    const audioButtonData = [
      { title: 'Previous Track', icon: 'audio-button fa fa-step-backward', id: 'backward-skip' },
      { title: 'Next Track', icon: 'audio-button fa fa-step-forward', id: 'forward-skip' },
      { title: 'Continuous Playback', icon: 'audio-button toggle fa fa-refresh', id: 'continuous-play' },
      { title: 'Shuffle Playback', icon: 'audio-button toggle fa fa-random', id: 'shuffle-play' }
    ]

    this.player = this.renderAudioPlayer()
    this.nowPlaying = this.renderNowPlaying()

    return (
      createElement('div', { id: 'audio-module' }, [
        this.nowPlaying,
        ['div', {id: 'audio-wrapper'}, [
          this.player,
          ['div', { id: 'audio-controls' }, [
            ...audioButtonData.map(button => (
              createElement('span', { class: 'audio-btn-container', title: button.title }, [
                ['i', { class: button.icon, id: button.id }]
              ])
            ))
          ]]
        ]]
      ])
    )
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

module.exports = Audio
