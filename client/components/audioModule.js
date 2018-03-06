const createElement = require('./../utils/elementCreation')

const $audioPlayer = createElement('audio', { id: 'audio-player', controls: '', controlsList: 'nodownload', src: '' }, '', [])
$audioPlayer.addEventListener('contextmenu', e => e.preventDefault())
const $audioModule = createElement('div', { id: 'audio-module' }, '', [
  createElement('div', { id: 'now-playing-container' }, ' ', [
    createElement('span', { id: 'now-playing' }, '', [])
  ]),
  createElement('div', {id: 'audio-wrapper'}, '', [
    $audioPlayer,
    createElement('div', { id: 'audio-controls' }, '', [
      createElement('span', { class: 'audio-btn-container', title: 'Previous Track' }, '', [
        createElement('i', { class: 'audio-button fa fa-step-backward', id: 'backward-skip' }, '', [])
      ]),
      createElement('span', { class: 'audio-btn-container', title: 'Next Track' }, '', [
        createElement('i', { class: 'audio-button fa fa-step-forward', id: 'forward-skip' }, '', [])
      ]),
      createElement('span', { class: 'audio-btn-container', title: 'Continuous Playback' }, '', [
        createElement('i', { class: 'audio-button toggle fa fa-refresh', id: 'continuous-play' }, '', [])
      ]),
      createElement('span', { class: 'audio-btn-container', title: 'Shuffle Playback' }, '', [
        createElement('i', { class: 'audio-button toggle fa fa-random', id: 'shuffle-play' }, '', [])
      ])
    ])
  ])
])

module.exports = $audioModule
