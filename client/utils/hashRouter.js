class HashRouter {
  constructor($views) {
    this.$views = $views
    this.isListening = false
  }
  match(hash) {
    if (hash === '' || hash === '#') {
      const $urlSubmitInput = document.getElementById('url-submit-input')
      $urlSubmitInput.value = ''
      hash = '#url-form'
    }
    const $audioPlayer = document.getElementById('audio-player')
    const $nowPlaying = document.getElementById('now-playing')
    $audioPlayer.pause()
    $audioPlayer.currentTime = 0
    $audioPlayer.src = '/'
    $nowPlaying.textContent = ''
    const hashComponents = hash.split('?')
    const viewId = hashComponents[0].replace('#', '')

    this.$views.forEach($view => {
      if ($view.id === viewId) {
        $view.classList.remove('hidden')
      }
      else {
        $view.classList.add('hidden')
      }
    })
  }
  listen() {
    if (this.isListening) return

    window.addEventListener('hashchange', () => {
      this.match(window.location.hash)
    })

    this.isListening = true
  }
}

module.exports = HashRouter
