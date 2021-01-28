export default class CustomDictionaryFormController {
  /* @ngInject */
  constructor (StringService) {
    this.strings = StringService.get().components.customDictionaryForm
  }
}
