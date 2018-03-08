const { setRef } = require('./../state/elementRefs')

function createElement(...args) {
  const argArr = args.slice()
  const elType = argArr.shift()

  let textContent = ''
  let attributes = {}
  let children = []

  argArr.forEach(trait => {
    if (typeof trait === 'string') textContent = trait
    if (typeof trait === 'object') {
      if (Array.isArray(trait)) children = trait
      else attributes = trait
    }
  })
  const $el = document.createElement(elType)

  $el.textContent = textContent
  for (const key in attributes) {
    $el.setAttribute(key, attributes[key])
    if (key === 'id') setRef(attributes[key], $el)
  }
  children.forEach($child => {
    if ($child instanceof HTMLElement) {
      $el.appendChild($child)
    }
    if (Array.isArray($child)) {
      $el.appendChild(createElement(...$child))
    }
  })

  return $el
}

module.exports = createElement
