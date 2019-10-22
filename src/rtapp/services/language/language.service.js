import emojione from 'emojione'

export default class LanguageService {
  /* @ngInject */
  constructor ($http, $filter) {
    this.$http = $http
    this.$filter = $filter
  }
  get (filterExpression) {
    return new Promise((resolve, reject) => {
      resolve([
        {
          code: 'en',
          icon: emojione.shortnameToImage(':united_nations:'),
          name: 'Global English',
          default: true
        }
      ])
    }).then(languages => {
      return this.$filter('filter')(languages, filterExpression)
    })
  }
}
