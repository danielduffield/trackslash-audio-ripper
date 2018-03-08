const createElement = require('./../utils/createElement')

function renderLanding() {
  const $contentContainer = createElement('div')
  const $background = createElement('div', { id: 'background' })
  const $foreground = createElement('div', { id: 'darkening-layer' })
  const $content = createElement('div', { class: 'container' }, [
    ['div', { class: 'landing' }, [
      ['div', { class: 'row' }, [
        ['div', { class: 'col-md-8 col-md-offset-2' }, [
          ['h1', [
            ['a', { href: '/#', class: 'title-link' }, 'Track/Slash']
          ]],
          ['h3', { id: 'main-subtitle' }, [
            ['a', { href: '/#', class: 'title-link' }, 'Audio Ripper']
          ]]
        ]]
      ]],
      ['div', { id: 'url-form', class: 'view' }, [
        ['div', { class: 'row' }, [
          ['div', { class: 'col-md-8 col-md-offset-2' }, [
            ['h3', { id: 'url-subtitle', class: 'subtitle' }, 'Enter a Youtube URL:']
          ]]
        ]],
        ['div', { class: 'row' }, [
          ['div', { id: 'url-form-col', class: 'col-md-10 col-md-offset-1' }, [
            ['form', { id: 'url-submit-form' }, [
              ['div', { class: 'input-group' }, [
                ['input', { type: 'text', id: 'url-submit-input', class: 'form-control', placeholder: 'Youtube URL Goes Here' }],
                ['span', { class: 'input-group-btn' }, [
                  ['button', { id: 'url-submit-btn', class: 'btn btn-default', type: 'submit' }, 'Engage!']
                ]]
              ]]
            ]],
            ['br'],
            ['p', { id: 'demo-notice' }]
          ]]
        ]]
      ]]
    ]]
  ])

  $contentContainer.appendChild($background)
  $contentContainer.appendChild($foreground)
  $contentContainer.appendChild($content)

  return $contentContainer
}

module.exports = renderLanding()
