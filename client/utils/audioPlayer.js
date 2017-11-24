const { createElement } = require('./elementCreation')

const $audioPlayer = createElement('audio', { id: 'audio-player', controls: '', controlsList: 'nodownload', src: '43)-Railroad-Wrath-[Boss].mp3' }, '', [])
const $audioButton = createElement('button', { id: 'audio-button', class: 'btn btn-default' }, 'Cycle', [])

function createAudioPlayer() {
  const $audioModule = createElement('div', {}, '', [$audioPlayer, $audioButton])

  $audioPlayer.addEventListener('contextmenu', event => event.preventDefault())
  $audioButton.addEventListener('click', () => {
    $audioPlayer.pause()
    $audioPlayer.currentTime = 0
    $audioPlayer.src = 'Color-of-Autumn.mp3'
  })
  return $audioModule

}

module.exports = createAudioPlayer
