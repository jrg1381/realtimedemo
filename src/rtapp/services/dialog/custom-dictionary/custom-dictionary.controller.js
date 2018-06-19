import './custom-dictionary.style.scss'

const DEFAULT_PROTEUS_CONFIG = {"words": []}
const PROTEUS_CONFIG_STORAGE_KEY = "rt-config-proteus"

export default class CustomDictionaryController {
  /* @ngInject */
  constructor ($mdDialog, $scope, $window) {
    $scope.$ctrl = this
    this.$window = $window
    this.formModel = this.getProteusConfig()
    this.$mdDialog = $mdDialog
    this.$window = $window
    this.submitting = false
    this.content = {'title': 'Custom dictionary'}
  }

  getProteusConfig() {
    return this.$window.localStorage.getItem('rt-config-proteus') ||
      JSON.stringify(DEFAULT_PROTEUS_CONFIG, null, "    ")
  }

  setProteusConfig() {
    let tidy = JSON.stringify(JSON.parse(this.formModel), null, "    ")
    this.$window.localStorage.setItem(PROTEUS_CONFIG_STORAGE_KEY, tidy)
  }

  submit () {
    this.submitting = true
    try {
      let parsedData = JSON.parse(this.formModel)
    } catch(e) {
        this.submitting = false
        // TODO: until can do proper validation (ng-valid / ng-invalid)
        this.content.title = 'Custom dictionary (invalid JSON)'
        return false
    }
    this.setProteusConfig()
    this.close()
  }
  close () {
    this.$mdDialog.hide()
  }
}
