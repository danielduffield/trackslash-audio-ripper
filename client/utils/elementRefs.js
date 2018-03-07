const elementRefs = {}

const loadElementRef = elId => elementRefs[elId]

const addLoadRef = elId => (
	Object.keys(elementRefs).includes(elId)
		? loadElementRef(elId)
		: setOverwriteRef(elId)
)

const setOverwriteRef = elId => {
	elementRefs[elId] = document.getElementById(elId)
	return elementRefs[elId]
}

const generateInitialRefs = () => ({
	$urlInput: addLoadRef('url-submit-input'),
	$trackFormContainer: addLoadRef('track-form-container'),
	$trackFinalContainer: addLoadRef('track-final-container'),
	$demoNotice: addLoadRef('demo-notice'),
	$urlSubmitForm: addLoadRef('url-submit-form'),
	$addTrackButton: addLoadRef('track-form-add-button'),
	$tracklistForm: addLoadRef('tracklist-form'),
	$startOverBtn: addLoadRef('start-over-button'),
	$resetTracklistBtn: addLoadRef('reset-tracklist-button'),
	$loadTimecodesBtn: addLoadRef('load-timecodes-button'),
	$tracklistError: addLoadRef('tracklist-error-message-container'),
	$timecodeError: addLoadRef('timecode-error-message-container'),
	$submitTimecodesButton: addLoadRef('submit-timecodes-button'),
	$timecodeSubmitBtn: addLoadRef('timecode-submit-button'),
	$timecodeCancelBtn: addLoadRef('timecode-cancel-button'),
	$timecodeInputBox: addLoadRef('timecode-input-box'),
	$audioControls: addLoadRef('audio-controls'),
	$downloadProgress: addLoadRef('album-download-progress'),
	$sliceProgress: addLoadRef('track-slice-progress'),
})

module.exports = { generateInitialRefs, addLoadRef, setOverwriteRef }
