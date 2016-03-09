/**
 * This file is part of the angular-repository package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {stringify} from "query-string";

export class OAuth {

    /**
     * Check if is configured
     *
     * @param config
     * @param $http
     * @param OAuthToken
     */
    constructor(config, $http, OAuthToken) {
        if (!config.baseUrl || !config.clientId) {
            throw new Error('`OAuthProvider` must be configured first.');
        }

        this.config = config;
        this.http = $http;
        this.OAuthToken = OAuthToken;
    }

    /**
     * Verifies if the `user` is authenticated or not based on the `token`
     *
     * @return {boolean}
     */
    isAuthenticated() {
        return !!this.OAuthToken.getToken();
    }

    /**
     * Retrieves the `access_token` and stores the `response.data`
     * using the `OAuthToken`.
     *
     * @param {object} data - Request content, e.g., `username` and `password`.
     * @param {object} options - Optional configuration.
     * @return {promise} A response promise.
     */
    getClientToken(data, options) {
        data = angular.extend({
            client_id: this.config.clientId,
            grant_type: 'client_credentials'
        }, data);

        if (null !== this.config.clientSecret) {
            data.client_secret = this.config.clientSecret;
        }

        data = stringify(data);

        options = angular.extend({
            headers: {
                'Authorization': undefined,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }, options);

        return this.http.post(`${this.config.baseUrl}${this.config.grantPath}`, data, options).then((response) => {
            this.OAuthToken.setToken(response.data);

            return response;
        });
    }

    /**
     * Retrieves the `access_token` and stores the `response.data`
     * using the `OAuthToken`.
     *
     * @param {object} data - Request content, e.g., `username` and `password`.
     * @param {object} options - Optional configuration.
     * @return {promise} A response promise.
     */
    getAccessToken(data, options) {
        data = angular.extend({
            client_id: this.config.clientId,
            grant_type: 'password'
        }, data);

        if (null !== this.config.clientSecret) {
            data.client_secret = this.config.clientSecret;
        }

        data = stringify(data);

        options = angular.extend({
            headers: {
                'Authorization': undefined,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }, options);

        return this.http.post(`${this.config.baseUrl}${this.config.grantPath}`, data, options).then((response) => {
            this.OAuthToken.setToken(response.data);

            return response;
        });
    }

    /**
     * Retrieves the `refresh_token` and stores the `response.data`
     * using the `OAuthToken`.
     *
     * @param {object} data - Request content.
     * @param {object} options - Optional configuration.
     * @return {promise} A response promise.
     */
    getRefreshToken(data, options) {
        data = angular.extend({
            client_id: this.config.clientId,
            grant_type: 'refresh_token',
            refresh_token: this.OAuthToken.getRefreshToken(),
        }, data);

        if (null !== this.config.clientSecret) {
            data.client_secret = this.config.clientSecret;
        }

        data = stringify(data);

        options = angular.extend({
            headers: {
                'Authorization': undefined,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }, options);

        return this.http.post(`${this.config.baseUrl}${this.config.grantPath}`, data, options).then((response) => {
            this.OAuthToken.setToken(response.data);

            return response;
        });
    }

    /**
     * Revokes the `token` and removes the stored `token`
     * using the `OAuthToken`.
     *
     * @param {object} data - Request content.
     * @param {object} options - Optional configuration.
     * @return {promise} A response promise.
     */
    revokeToken(data, options) {
        var refreshToken = this.OAuthToken.getRefreshToken();

        data = angular.extend({
            client_id: this.config.clientId,
            token: refreshToken ? refreshToken : this.OAuthToken.getAccessToken(),
            token_type_hint: refreshToken ? 'refresh_token' : 'access_token'
        }, data);

        if (null !== this.config.clientSecret) {
            data.client_secret = this.config.clientSecret;
        }

        data = stringify(data);

        options = angular.extend({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }, options);

        return this.http.post(`${this.config.baseUrl}${this.config.revokePath}`, data, options).then((response) => {
            this.OAuthToken.removeToken();

            return response;
        });
    }
}