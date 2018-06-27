import './custom-dictionary.style.scss'
import jsonvalidator from '../../../components/app/app.jsonvalidator'


export default class CustomDictionaryController {
  /* @ngInject */
  constructor ($mdDialog, $scope, ConfigLoaderService) {
    $scope.$ctrl = this
    this.$mdDialog = $mdDialog
    this.submitting = false
    this.content = {'title': 'Custom dictionary'}
    this.ConfigLoaderService = ConfigLoaderService
    this.jsonvalidator = new jsonvalidator()
    ConfigLoaderService.get().then(config => {
      this.formModel = JSON.stringify(config.custom_dictionary, null, "    ")
      this.config = config
      this.validjson = this.jsonvalidator.validate(this.formModel)
    })
  }

  submit () {
    this.submitting = true

    if(this.jsonvalidator.validate(this.formModel)) {
      let parsedData = JSON.parse(this.formModel)
      this.config.custom_dictionary = parsedData
      this.ConfigLoaderService.save(this.config)
    } else {
      this.validjson = false
      return this.failSubmit("Bad json")
    }

    this.close()
  }

  failSubmit(message) {
    this.submitting = false
    this.content.title = message
    return false
  }

  close () {
    this.$mdDialog.hide()
  }
}
