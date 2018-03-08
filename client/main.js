const { loadRef } = require('./state/elementRefs')
const state = require('./state/state')

const attachInitialListeners = require('./listeners/index.js')

const $formTable = require('./renders/formTable')
const $landing = require('./renders/landing')
const $tracklistTable = require('./renders/tracklistTable')
const $timecodeForm = require('./renders/timecodeForm')

const HashRouter = require('./utils/hashRouter.js')

document.body.appendChild($landing)
document.body.appendChild($formTable)
document.body.appendChild($tracklistTable)
document.body.appendChild($timecodeForm)

const $urlInput = loadRef('url-submit-input')
const $demoNotice = loadRef('demo-notice')

$urlInput.focus()
const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

router.listen()
router.match(window.location.hash)

$demoNotice.textContent = state.demo ? '*To comply with Heroku policy, file download is disabled in this demonstration.' : ''

attachInitialListeners()
