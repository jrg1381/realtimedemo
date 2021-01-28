import './config.style.scss'

export default class ConfigDialogController {
  /* @ngInject */
  constructor ($scope, $mdDialog, config) {
    $scope.fieldsets = {
      app: {
        debug: {
          label: 'Debug (show application state)',
          type: 'checkbox'
        },
        listen: {
          label: 'Listen (use headphones!)',
          type: 'checkbox'
        }
      },
      api: {
        host: {
          label: 'API Host (Port)',
          type: 'text'
        },
        user_id: {
          label: 'User ID',
          type: 'number'
        },
        auth_token: {
          label: 'Token',
          type: 'text'
        }
      }
    }
    $scope.liveConfig = config
    $scope.config = angular.copy($scope.liveConfig)
    $scope.save = function () {
      $mdDialog.hide($scope.config)
      $scope.liveConfig.api = $scope.config.api
      $scope.liveConfig.app = $scope.config.app
      $scope.liveConfig.custom_dictionary = $scope.config.custom_dictionary
    }
    $scope.cancel = function () {
      $mdDialog.cancel()
    }
  }
}
