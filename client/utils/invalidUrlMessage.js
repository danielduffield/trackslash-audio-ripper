const createElement = require('./elementCreation')

function invalidUrlMessage() {
  const $invalidUrl = createElement('div', {class: 'alert alert-danger', role: 'alert'}, 'Enter a valid Youtube URL', [
    createElement('span', {class: 'glyphicon glyphicon-exclamation-sign', 'aria-hidden': 'true'}, '', []),
    createElement('span', {class: 'sr-only'}, 'Error:', [])
  ])
  return $invalidUrl
}

module.exports = invalidUrlMessage
