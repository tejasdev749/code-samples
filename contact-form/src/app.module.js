/**
 * AngularJS 1.x Contact Form Application
 *
 * Learning Concepts:
 * - Module: ng.module creates a container for services, controllers, directives
 * - Dependency Injection: Services injected into controllers
 * - Directives: ng-app, ng-controller, ng-model, ng-submit, ng-if, ng-show, etc.
 * - Data Binding: Two-way binding with ng-model, one-way with {{ }}
 */

// Create the main application module
// First parameter: module name
// Second parameter: array of dependencies (services, filters, other modules)
angular.module('mainApp', ['phoneList','videoList']);

console.log('AngularJS Application Initialized');
console.log('Module: mainApp created');
