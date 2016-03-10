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

```javascript
angular.module('myApp', ['vOAuth2'])
  .run(['$rootScope', '$window', function($rootScope, $window) {
    $rootScope.$on('voauth:error', function(event, rejection) {
      return $window.location.href = '/login?error_reason=' + rejection.data.error;
    });
  }]);
```