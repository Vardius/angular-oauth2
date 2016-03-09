/**
 * This file is part of the angular-repository package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import 'angular';
import 'angular-mocks/angular-mocks';

var testsContext = require.context(".", true, /.spec$/);
testsContext.keys().forEach(testsContext);