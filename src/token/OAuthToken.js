/**
 * This file is part of the angular-repository package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export class OAuthToken {

    /**
     * @param config
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * Set token.
     */
    setToken(data) {
        return window[this.config.storage].setItem(this.config.storageKey, JSON.stringify(data));
    }

    /**
     * Get token.
     */
    getToken() {
        let data = window[this.config.storage].getItem(this.config.storageKey);
        return (data) ? JSON.parse(data) : false;
    }

    /**
     * Get accessToken.
     */
    getAccessToken() {
        return this.getToken() ? this.getToken().access_token : undefined;
    }

    /**
     * Get authorizationHeader.
     */
    getAuthorizationHeader() {
        if (!(this.getTokenType() && this.getAccessToken())) {
            return;
        }

        return `${this.getTokenType().charAt(0).toUpperCase() + this.getTokenType().substr(1)} ${this.getAccessToken()}`;
    }

    /**
     * Get refreshToken.
     */
    getRefreshToken() {
        return this.getToken() ? this.getToken().refresh_token : undefined;
    }

    /**
     * Get tokenType.
     */
    getTokenType() {
        return this.getToken() ? this.getToken().token_type : undefined;
    }

    /**
     * Remove token.
     */
    removeToken() {
        return window[this.config.storage].removeItem(this.config.storageKey);
    }
}
