const createElement = require('./elementCreation')

const invalidUrlMessage = () => (
  createElement(
    'div', { class: 'alert alert-danger', role: 'alert' }, 'Enter a valid Youtube URL', [
      ['span', { class: 'glyphicon glyphicon-exclamation-sign', 'aria-hidden': 'true' }],
      ['span', { class: 'sr-only' }, 'Error:']
    ])
)

module.exports = invalidUrlMessage
