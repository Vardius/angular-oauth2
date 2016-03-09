/**
 * This file is part of the angular-repository package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {OAuthToken} from "../token/OAuthToken";

export class OAuthTokenProvider {

    constructor() {
        this.config = {
            storage: 'sessionStorage', //localStorage
            storageKey: 'OAuthConfig'
        }
    }

    configure(params) {
        for (var attr in params) {
            if (params.hasOwnProperty(attr)) {
                this.config[attr] = params[attr];
            }
        }
    }

    $get() {
        return new OAuthToken(this.config);
    }
}
