import configFilePath from 'file-loader?name=[name].[ext]?[hash]!./../../config.json'

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
    let storedConfig = this.$window.localStorage.getItem('rt-config')
    if(storedConfig) {
      return JSON.parse(storedConfig)
    }
    return null
  }

  _setStoredConfig() {
    this.$window.localStorage.setItem('rt-config', JSON.stringify(this.config))
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
    return this.$http
      .get(`./${configFilePath}`, {
        cache: true
      })
      .then(response => {
        this.config = response.data
        this._setStoredConfig()
        if (this.config.api.host === true) {
          this.config.api.host = this.$window.location.hostname
        }
        return this.config
      })
  }
}
