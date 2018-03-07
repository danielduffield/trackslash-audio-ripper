const state = require('./state/state')
const attachListeners = require('./listeners/index.js')

const $formTable = require('./components/formTable')
const $tracklistTable = require('./components/tracklistTable')
const $timecodeForm = require('./components/timecodeForm')

const { addLoadRef } = require('./utils/elementRefs')
const HashRouter = require('./utils/hashRouter.js')

document.body.appendChild($formTable)
document.body.appendChild($tracklistTable)
document.body.appendChild($timecodeForm)

const $urlInput = addLoadRef('url-submit-input')
const $demoNotice = addLoadRef('demo-notice')

$urlInput.focus()
const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

router.listen()
router.match(window.location.hash)

$demoNotice.textContent = state.demo ? '*To comply with Heroku policy, file download is disabled in this demonstration.' : ''

state.listeners = attachListeners()
