const elementRefs = {}

const elementIds = {
	$urlInput: 'url-submit-input',
	$trackFormContainer: 'track-form-container',
	$trackFinalContainer: 'track-final-container',
	$demoNotice: 'demo-notice',
	$urlSubmitForm: 'url-submit-form',
	$addTrackButton: 'track-form-add-button',
	$tracklistForm: 'tracklist-form',
	$startOverBtn: 'start-over-button',
	$resetTracklistBtn: 'reset-tracklist-button',
	$loadTimecodesBtn: 'load-timecodes-button',
	$tracklistError: 'tracklist-error-message-container',
	$timecodeError: 'timecode-error-message-container',
	$submitTimecodesButton: 'submit-timecodes-button',
	$timecodeSubmitBtn: 'timecode-submit-button',
	$timecodeCancelBtn: 'timecode-cancel-button',
	$timecodeInputBox: 'timecode-input-box',
	$audioControls: 'audio-controls',
	$downloadProgress: 'album-download-progress',
	$sliceProgress: 'track-slice-progress',
}

const generateElementRefs = () => {
	for (const key in elementIds) {
		elementRefs[key] = document.getElementById(elementIds[key])
	}
	return elementRefs
}

const loadElementRef = elId => {
	for (const key in elementIds) {
		if (elementIds[key] === elId) {
			return elementRefs[key]
		}
	}
}

const updateElementRef = (elName, elId) => {
	if (elementRefs[elName]) {
		console.log(`updating ${elName}/${elementIds[elName]} with ${elName}/${elId}`)
		console.log(elementRefs)
	}

	elementIds[elName] = elId
	elementRefs[elName] = document.getElementById(elementIds[elName])
	return elementRefs[elName]
}

module.exports = { elementRefs, generateElementRefs, loadElementRef, updateElementRef }
