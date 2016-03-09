/**
 * This file is part of the angular-repository package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {OAuth} from "./../oauth/OAuth";

export class OAuthProvider {

    /**
     * Inject dependencies
     */
    constructor() {
        this.$get.$inject = ['$http', 'OAuthToken'];
        this.config = {
            baseUrl: null,
            clientId: null,
            clientSecret: null,
            grantPath: '/oauth2/token',
            revokePath: '/oauth2/revoke'
        };
    }

    /**
     * Configure.
     *
     * @param {object} params
     */
    configure(params) {
        for (var attr in params) {
            if (params.hasOwnProperty(attr)) {
                this.config[attr] = params[attr];
            }
        }

        if ('/' === this.config.baseUrl.substr(-1)) {
            this.config.baseUrl = this.config.baseUrl.slice(0, -1);
        }

        if ('/' !== this.config.grantPath[0]) {
            this.config.grantPath = `/${this.config.grantPath}`;
        }

        if ('/' !== this.config.revokePath[0]) {
            this.config.revokePath = `/${this.config.revokePath}`;
        }

        return this.config;
    };

    $get($http, OAuthToken) {
        return new OAuth(this.config, $http, OAuthToken);
    }
}
