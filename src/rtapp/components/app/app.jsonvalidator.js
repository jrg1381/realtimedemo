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

export default class JsonValidator {
    constructor () {
        var ajv = new Ajv()
        this.validator = ajv.compile(JSON_SCHEMA)
    }

    validate(jsonIn) {
        try {
            let parsedData = JSON.parse(jsonIn)
            let result = this.validator(parsedData)
            console.log(this.validator.errors)
            return result
        } catch(e) {
            console.log(e)
            return false
        }
    }
}