/**
 * This file is part of the angular-oauth2 package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {config as httpConfig} from "./configs/http";
import {interceptor as oauthInterceptor} from "./interceptors/interceptor";
import {OAuthProvider} from "./provider/OAuthProvider";
import {OAuthTokenProvider} from "./provider/OAuthTokenProvider";

(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
        module.exports = factory(require('angular'));
    } else {
        return factory(root.angular);
    }
}(this, repository));

function repository(angular) {
    'use strict';

    var moduleName = 'vOAuth2';

    angular
        .module(moduleName, [])
        .config(httpConfig)
        .factory("oauthInterceptor", oauthInterceptor)
        .provider('OAuth', OAuthProvider)
        .provider('OAuthToken', OAuthTokenProvider)
    ;

    return moduleName;
}