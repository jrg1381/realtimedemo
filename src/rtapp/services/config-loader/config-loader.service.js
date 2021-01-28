const configFilePath = require('../../config.json')

const ConfigStorage = {
  LOCAL_STORAGE:
    'rt-config'
}

export default class ConfigLoaderService {
  /* @ngInject */
  constructor ($http, $q, $window) {
    this.$http = $http
    this.$q = $q
    this.$window = $window
  }
  get () {
    let deferred = this.$q.defer()
    let storedConfig = this._getStoredConfig()

    if (storedConfig) {
      if(this.config) {
        this.config.api = storedConfig.api
        this.config.app = storedConfig.app
        this.config.custom_dictionary = storedConfig.custom_dictionary
      } else {
        this.config = storedConfig
      }
      deferred.resolve(this.config)
      return deferred.promise
    } else {
      return this._load()
    }
  }

  _getStoredConfig() {
    let storedConfig = this.$window.localStorage.getItem(ConfigStorage.LOCAL_STORAGE)
    if(storedConfig) {
      return JSON.parse(storedConfig)
    }
    return null
  }

  _setStoredConfig() {
    this.$window.localStorage.setItem(ConfigStorage.LOCAL_STORAGE, JSON.stringify(this.config))
  }

  save (config) {
    let deferred = this.$q.defer()
    this.config = config
    for (var key in config) {
      if (!isNaN(parseInt(config[key]))) {
        config[key] = parseInt(config[key])
      }
    }
    this._setStoredConfig()
    deferred.resolve(this.config)
    return deferred.promise
  }
  _load () {
    // Capture 'this'
    var that = this
    return new Promise(function(resolve, reject) {
      that.config = configFilePath
      that._setStoredConfig()
        if (that.config.api.host === true) {
          that.config.api.host = that.$window.location.hostname
        }
        resolve(that.config)
      }
    )
  }
}
