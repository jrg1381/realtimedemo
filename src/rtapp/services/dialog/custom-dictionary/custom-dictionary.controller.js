import './custom-dictionary.style.scss'

const JSON_SCHEMA = {
  "type": "array",
  "items": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "object",
        "properties": {
          "content": {
            "type": "string"
          },
          "sounds_like": {
            "type": "array"
          }
        },
        "required": [
          "content",
          "sounds_like"
        ]
      }
    ]
  }
}

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

  validateJson(jsonIn) {
    var ajv = new Ajv()
    var validate = ajv.compile(JSON_SCHEMA)
    let result = validate(jsonIn)
    if(!result) {
      console.log(validate.errors)
    }
    return result
  }

  submit () {
    this.submitting = true
    try {
      let parsedData = JSON.parse(this.formModel)

      if(!this.validateJson(parsedData)) {
        return this.failSubmit('Custom dictionary (bad JSON schema)')
      }

      this.config.custom_dictionary = parsedData
      this.ConfigLoaderService.save(this.config)
    } catch(e) {
      console.log(e)
        return this.failSubmit('Custom dictionary (invalid JSON)')
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
