/**
 * This file is part of the angular-repository package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

interceptor.$inject = ["$q", '$injector', '$rootScope'];

export function interceptor($q, $injector, $rootScope) {
    return {
        request: (config) => {
            config.headers = config.headers || {};

            let OAuthToken = $injector.get('OAuthToken');
            if (!config.headers.hasOwnProperty('Authorization')) {
                if (OAuthToken.getAuthorizationHeader()) {
                    config.headers['Authorization'] = OAuthToken.getAuthorizationHeader();
                } else {
                    let OAuth = $injector.get('OAuth');
                    return OAuth.getClientToken().then(() => {
                        config.headers['Authorization'] = OAuthToken.getAuthorizationHeader();

                        return config;
                    }, () => {
                        return config;
                    });
                }
            }

            return config;
        },

        responseError: (rejection) => {
            let OAuth = $injector.get('OAuth');
            let OAuthToken = $injector.get('OAuthToken');

            if (400 === rejection.status && rejection.data &&
                ('invalid_request' === rejection.data.error || 'invalid_grant' === rejection.data.error)
            ) {
                OAuthToken.removeToken();
                $rootScope.$emit('voauth:error', rejection);
            }

            if (401 === rejection.status &&
                (rejection.data && ('invalid_token' === rejection.data.error || 'invalid_grant' === rejection.data.error)) ||
                (rejection.headers('www-authenticate') && 0 === rejection.headers('www-authenticate').indexOf('Bearer'))
            ) {
                let deferred = $q.defer();
                let $http = $injector.get('$http');

                OAuth.getRefreshToken().then(() => {
                    $http(rejection.config).then((response) => {
                            deferred.resolve(response);
                        }, () => {
                            OAuthToken.removeToken();
                            $rootScope.$emit('voauth:error', rejection);

                            deferred.reject(rejection);
                        }
                    );
                }, () => {
                    OAuthToken.removeToken();
                    $rootScope.$emit('voauth:error', rejection);

                    deferred.reject(rejection);
                });

                return deferred.promise;
            }

            return $q.reject(rejection);
        }
    }
}
