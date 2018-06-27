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
      // It should be impossible to have stored invalid JSON, but...
      this.validateJson(config.custom_dictionary)
    })

  }

  validateJson(jsonIn) {
    var ajv = new Ajv()
    var validate = ajv.compile(JSON_SCHEMA)
    this.validjson = validate(jsonIn)
    if(!this.validjson) {
      console.log(validate.errors)
    }
    return this.validjson
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
      this.validjson = false
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
