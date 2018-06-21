import './custom-dictionary.style.scss'

export default class CustomDictionaryController {
  /* @ngInject */
  constructor ($mdDialog, $scope, ConfigLoaderService) {
    $scope.$ctrl = this
    this.$mdDialog = $mdDialog
    this.submitting = false
    this.content = {'title': 'Custom dictionary'}
    this.ConfigLoaderService = ConfigLoaderService
    ConfigLoaderService.get().then(config => {
      this.formModel = JSON.stringify(config.custom_dictionary, null, "    ")
      this.config = config
    })
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

    this.config.custom_dictionary = JSON.parse(this.formModel)
    this.ConfigLoaderService.save(this.config)
    this.close()
  }
  close () {
    this.$mdDialog.hide()
  }
}
