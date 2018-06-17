import './custom-dictionary.style.scss'

export default class CustomDictionaryController {
  /* @ngInject */
  constructor ($mdDialog, $scope) {
    $scope.$ctrl = this
    this.formModel = { 'words': ['foo', 'bar', 'baz'] }
    this.$mdDialog = $mdDialog
    this.submitting = false
    this.content = {'title': 'Custom dictionary'}
  }
  submit () {
    this.submitting = true
    alert('foo')
    this.close()
  }
  close () {
    this.$mdDialog.hide()
  }
}
