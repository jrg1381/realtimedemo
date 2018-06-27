import './custom-dictionary-form.style.scss'
import template from './custom-dictionary-form.tmpl.html'
import controller from './custom-dictionary-form.controller'

export default {
  template,
  controller,
  bindings: {
    ngDisabled: '=',
    ngModel: '=',
    validjson: '=',
  }
}
