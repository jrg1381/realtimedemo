import jsonvalidator from '../app/app.jsonvalidator'


export default class CustomDictionaryFormController {
  /* @ngInject */
  constructor (StringService) {
    this.strings = StringService.get().components.customDictionaryForm
    this.jsonvalidator = new jsonvalidator()
  }

  change(e) {
    this.validjson = this.jsonvalidator.validate(this.ngModel)
  }
}
