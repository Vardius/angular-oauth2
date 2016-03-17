angular-voauth2
==================

Angular oauth2 provider

## Installation

Install with bower:

```bash
$ bower install angular-voauth2 --save
```

Install with npm:

```bash
$ npm install angular-voauth2
```

Load the `angular-voauth2` module in your app.

```javascript
angular.module('app', ['vOAuth2']);
```

## Catch oauth errors

Remember to remove token

```javascript
angular.module('myApp', ['vOAuth2'])
  .run(run);
  
  run.$inject = ['$rootScope', '$state'];
  
  function run($rootScope, $state) {
      $rootScope.$on('voauth:error', function () {
          $state.go('login', {}, {reload: true});
      });
  }
```