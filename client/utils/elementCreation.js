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
  for (const key in attributes) $el.setAttribute(key, attributes[key])
  children.forEach($child => $el.appendChild($child))

  return $el
}

module.exports = createElement
