let elementRefs

function generateElementRefs() {
	const initialElements = {
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
	const elements = {}

	for (const key in initialElements) {
		elements[key] = document.getElementById(initialElements[key])
	}

	elementRefs = elements
	return elementRefs
}



module.exports = { elementRefs, generateElementRefs }
