/**
 * This file is part of the angular-repository package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
config.$inject = ["$httpProvider"];

export function config($httpProvider) {
    $httpProvider.interceptors.push('oauthInterceptor');
}