const createElement = require('./../utils/createElement')

const $audioPlayer = createElement('audio', { id: 'audio-player', controls: '', controlsList: 'nodownload', src: '' })
$audioPlayer.addEventListener('contextmenu', e => e.preventDefault())

const audioButtonData = [
  { title: 'Previous Track', icon: 'audio-button fa fa-step-backward', id: 'backward-skip' },
  { title: 'Next Track', icon: 'audio-button fa fa-step-forward', id: 'forward-skip' },
  { title: 'Continuous Playback', icon: 'audio-button toggle fa fa-refresh', id: 'continuous-play' },
  { title: 'Shuffle Playback', icon: 'audio-button toggle fa fa-random', id: 'shuffle-play' }
]

const $audioModule = createElement('div', { id: 'audio-module' }, [
  ['div', { id: 'now-playing-container' }, ' ', [
    ['span', { id: 'now-playing' }]
  ]],
  ['div', {id: 'audio-wrapper'}, [
    $audioPlayer,
    ['div', { id: 'audio-controls' }, [
      ...audioButtonData.map(button => (
        createElement('span', { class: 'audio-btn-container', title: button.title }, [
          ['i', { class: button.icon, id: button.id }]
        ])
      ))
    ]]
  ]]
])

module.exports = $audioModule
