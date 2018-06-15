import configFilePath from 'file-loader?name=[name].[ext]?[hash]!./../../config.json'

export default class ConfigLoaderService {
  /* @ngInject */
  constructor ($http, $q, $window) {
    this.$http = $http
    this.$q = $q
    this.$window = $window
  }
  get () {
    let deferred = this.$q.defer()
    if (this.config) {
      deferred.resolve(this.config)
      return deferred.promise
    } else {
      return this._load()
    }
  }
  save (config) {
    let deferred = this.$q.defer()
    this.config = config
    for (var key in config) {
      if (!isNaN(parseInt(config[key]))) {
        config[key] = parseInt(config[key])
      }
    }
    this.$window.localStorage.setItem('rt-config', JSON.stringify(config))
    deferred.resolve(this.config)
    return deferred.promise
  }
  _load () {
    let deferred = this.$q.defer()

    var storedConfig = this.$window.localStorage.getItem('rt-config')
    if(storedConfig) {
      this.config = JSON.parse(storedConfig)
      deferred.resolve(this.config)
      return deferred.promise
    }

    return this.$http
      .get(`./${configFilePath}`, {
        cache: true
      })
      .then(response => {
        this.config = response.data
        if (this.config.api.host === true) {
          this.config.api.host = this.$window.location.hostname
        }
        return this.config
      })
  }
}
