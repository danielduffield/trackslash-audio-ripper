const createElement = require('./../utils/elementCreation')

const $audioPlayer = createElement('audio', { id: 'audio-player', controls: '', controlsList: 'nodownload', src: '' }, '', [])
$audioPlayer.addEventListener('contextmenu', e => e.preventDefault())

const audioButtonData = [
	{ title: 'Previous Track', icon: 'audio-button fa fa-step-backward', id: 'backward-skip' },
	{ title: 'Next Track', icon: 'audio-button fa fa-step-forward', id: 'forward-skip' },
	{ title: 'Continuous Playback', icon: 'audio-button toggle fa fa-refresh', id: 'continuous-play' },
	{ title: 'Shuffle Playback', icon: 'audio-button toggle fa fa-random', id: 'shuffle-play' },
]

const $audioButtons = audioButtonData.map(button => (
	createElement('span', { class: 'audio-btn-container', title: button.title }, [
		createElement('i', { class: button.icon, id: button.id })
	])
))

const $audioModule = createElement('div', { id: 'audio-module' }, [
  createElement('div', { id: 'now-playing-container' }, ' ', [
    createElement('span', { id: 'now-playing' })
  ]),
  createElement('div', {id: 'audio-wrapper'}, [
    $audioPlayer,
    createElement('div', { id: 'audio-controls' }, [
      ...$audioButtons
    ])
  ])
])

module.exports = $audioModule
