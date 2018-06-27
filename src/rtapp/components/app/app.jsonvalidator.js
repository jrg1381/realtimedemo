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
    }

    validate(jsonIn) {
        try {
            let parsedData = JSON.parse(jsonIn)

            var ajv = new Ajv()
            var validator = ajv.compile(JSON_SCHEMA)
            let result = validator(parsedData)
            console.log(validator.errors)
            return result
        } catch(e) {
            console.log(e)
            return false
        }
    }
}