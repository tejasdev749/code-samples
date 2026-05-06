# AngularJS 1.x Learning Guide

This application demonstrates core AngularJS 1.x concepts. Open the browser console to see detailed logging of the application flow.

## Table of Contents
1. [Core Concepts](#core-concepts)
2. [Project Structure](#project-structure)
3. [How It Works](#how-it-works)
4. [Key Files Explained](#key-files-explained)
5. [Learning Exercises](#learning-exercises)

---

## Core Concepts

### 1. Module
A module is a container that holds your application components (controllers, services, filters, directives, etc.).

```javascript
// Create a module
angular.module('contactApp', []);

// Module with dependencies
angular.module('myApp', ['ngRoute', 'ngAnimate']);
```

**Key Points:**
- First parameter: module name (`'contactApp'`)
- Second parameter: array of dependencies (other modules your app needs)
- A module is created once and reused throughout the app

**In our app:**
- Created in `app.js`
- All controllers and services register with this module

---

### 2. Directives
Directives are markers on a DOM element that tell AngularJS to attach a specified behavior to that element.

#### Common Directives:

| Directive | Purpose | Example |
|-----------|---------|---------|
| `ng-app` | Bootstraps the AngularJS application | `<body ng-app="contactApp">` |
| `ng-controller` | Attaches a controller class to the view | `<div ng-controller="FormController">` |
| `ng-model` | Binds input/output of form controls to property | `<input ng-model="formData.name">` |
| `ng-submit` | Submits form by calling a function | `<form ng-submit="submitForm()">` |
| `ng-click` | Specifies behavior when an element is clicked | `<button ng-click="resetForm()">` |
| `ng-if` | Removes or recreates DOM element based on expression | `<div ng-if="submitStatus === 'success'">` |
| `ng-show` / `ng-hide` | Shows or hides element using CSS display | `<div ng-show="isSubmitting">` |
| `ng-repeat` | Repeats HTML element for each item in array | `<option ng-repeat="item in items">` |
| `ng-class` | Dynamically binds CSS classes | `<input ng-class="{error: isInvalid}">` |
| `ng-disabled` | Disables form elements | `<button ng-disabled="contactForm.$invalid">` |

**In our app:**
```html
<div ng-app="contactApp">                    <!-- Bootstraps app -->
  <div ng-controller="FormController">       <!-- Attaches controller -->
    <input ng-model="formData.name">         <!-- Two-way binding -->
    <form ng-submit="submitForm()">          <!-- Handles form submission -->
      <button ng-disabled="contactForm.$invalid"> <!-- Disable when invalid -->
    <div ng-if="submitStatus === 'success'"> <!-- Conditional rendering -->
    <div ng-show="contactForm.email.$invalid && contactForm.email.$touched">
```

---

### 3. Data Binding

#### Two-Way Binding
Data is synchronized between the model and the view in both directions using `ng-model`.

```html
<input ng-model="formData.name">
```

- User types in input → updates `$scope.formData.name` in controller
- Controller updates `$scope.formData.name` → updates input automatically

#### One-Way Binding (Interpolation)
Display data from controller using `{{ }}` syntax.

```html
<p>{{ formData.name }}</p>
<p>{{ formData.message.length }}</p>
```

**In our app:**
```html
<!-- Two-way binding -->
<input ng-model="formData.email">

<!-- One-way binding / interpolation -->
<p>{{ formData.message.length }} characters</p>
<p ng-if="contactForm.email.$invalid && contactForm.email.$touched">
  {{ contactForm.email.$error.email ? 'Invalid email' : 'Email required' }}
</p>
```

---

### 4. Services & Factories

#### Factory
Creates an object (service) with methods. Instantiated once and shared across controllers.

```javascript
angular.module('myApp').factory('ServiceName', function() {
  var serviceInstance = {
    // Public methods
    methodName: function() { },
    propertyName: 'value'
  };
  return serviceInstance;
});
```

**Characteristics:**
- Returns a plain JavaScript object
- Instantiated once (singleton pattern)
- Good for: data access, HTTP calls, business logic
- Cannot be instantiated with `new` keyword

**In our app (formService.js):**
```javascript
angular.module('contactApp').factory('FormService', ['$http', function($http) {
  var factory = {
    validateForm: function(formData) { },
    submitFormToSupabase: function(formData) { }
  };
  return factory;
}]);
```

#### Provider
A more advanced way to create services. Allows configuration during app initialization.

```javascript
angular.module('myApp').provider('ServiceName', function() {
  this.defaultValue = 'default';
  
  this.$get = function() {
    return { value: this.defaultValue };
  };
});
```

---

### 5. Controllers

A controller manages the logic and state for a portion of the view.

```javascript
angular.module('myApp').controller('ControllerName', function($scope, SomeService) {
  // Initialize data
  $scope.data = { };
  
  // Define methods
  $scope.doSomething = function() { };
});
```

**Key Points:**
- Attached to HTML via `ng-controller`
- Manages `$scope` (the glue between controller and view)
- Should contain business logic, not DOM manipulation
- Dependencies are injected (services, $http, $scope, etc.)

**In our app (formController.js):**
```javascript
angular.module('contactApp').controller('FormController', [
  '$scope',
  '$timeout',
  'FormService',
  function($scope, $timeout, FormService) {
    // Initialize
    $scope.formData = { };
    
    // Handle form submission
    $scope.submitForm = function() { };
    
    // Watch for changes
    $scope.$watch('submitStatus', function(newVal) { });
  }
]);
```

---

### 6. Dependency Injection

AngularJS has a built-in service locator that creates instances of services and resolves dependencies.

**Three ways to inject dependencies:**

1. **Inline Array Annotation (Recommended - minification safe)**
```javascript
angular.module('myApp').controller('MyCtrl', [
  '$scope',
  'MyService',
  function($scope, MyService) { }
]);
```

2. **Function Parameter (Not safe for minification)**
```javascript
angular.module('myApp').controller('MyCtrl', function($scope, MyService) { });
```

3. **$inject Property**
```javascript
var MyCtrl = function($scope, MyService) { };
MyCtrl.$inject = ['$scope', 'MyService'];
```

**In our app:**
- Using Array Annotation everywhere for minification safety
- Services are injected into controllers and factories

---

## Project Structure

```
project/
├── src/
│   ├── index.html              # Main HTML file (ng-app here)
│   ├── style.css               # Styling
│   ├── app.js                  # Module definition
│   ├── services/
│   │   └── formService.js      # Factory for form logic
│   └── controllers/
│       └── formController.js   # Controller for form
├── dist/
│   └── demo/browser/           # Built files (served by dev server)
└── ANGULARJS_GUIDE.md          # This file
```

---

## How It Works

### Application Flow

1. **Page loads** → `index.html` with `ng-app="contactApp"`

2. **AngularJS bootstrap**
   - Finds `ng-app` attribute
   - Creates injector
   - Loads `contactApp` module

3. **Module loads**
   - `app.js` - Module created
   - `formService.js` - Factory registered
   - `formController.js` - Controller registered

4. **Controller attached**
   - `ng-controller="FormController"` in HTML
   - AngularJS instantiates FormController
   - Injects dependencies: `$scope`, `$timeout`, `FormService`

5. **Form interaction**
   - User types → `ng-model` updates `$scope`
   - User submits → `ng-submit="submitForm()"`
   - Controller calls `FormService.submitFormToSupabase()`
   - Service makes HTTP POST to Supabase
   - Response updates `$scope` → view updates

6. **Data binding maintains synchronization**
   - Any `$scope` property change updates the view
   - Any input change updates `$scope` property

---

## Key Files Explained

### 1. index.html

**Key parts:**

```html
<!-- Bootstrap AngularJS application -->
<body ng-app="contactApp">

<!-- Attach controller to this div -->
<div ng-controller="FormController" class="container">

<!-- Two-way data binding: input syncs with $scope.formData.name -->
<input name="name" ng-model="formData.name" required minlength="3">

<!-- Show error if field is invalid and touched -->
<div ng-show="contactForm.name.$invalid && contactForm.name.$touched">
  Name is required
</div>

<!-- Form submit: calls $scope.submitForm() -->
<form name="contactForm" ng-submit="submitForm()">

<!-- One-way binding: displays character count -->
<p>{{ formData.message.length }} characters</p>

<!-- Conditional rendering: show only if success -->
<div ng-if="submitStatus === 'success'">
  Message Sent!
</div>
```

**Form validation properties:**
- `contactForm.$valid` - All fields valid
- `contactForm.$invalid` - Any field invalid
- `contactForm.$dirty` - User has changed a field
- `contactForm.$pristine` - User hasn't changed anything
- `contactForm.$submitted` - Form was submitted
- `contactForm.fieldName.$error.required` - Specific error type

### 2. app.js

```javascript
// Create module named 'contactApp' with no dependencies
angular.module('contactApp', []);
```

This is the glue that connects all components.

### 3. formService.js (Factory)

```javascript
angular.module('contactApp').factory('FormService', ['$http', function($http) {
  
  // Private variable - only accessible inside factory
  var _submissionCount = 0;

  // Factory object with public methods
  var factory = {
    
    // Validate form data
    validateForm: function(formData) {
      // Return validation result
    },

    // Submit to Supabase via HTTP
    submitFormToSupabase: function(formData) {
      return $http({
        method: 'POST',
        url: 'https://0ec90b57d6e95fcbda19832f.supabase.co/rest/v1/form_submissions',
        headers: { /* ... */ },
        data: formData
      });
    },

    // Format data for submission
    formatDataForSubmission: function(formData) {
      return { /* ... */ };
    }
  };

  return factory;
}]);
```

**Key Points:**
- `$http` is injected (AngularJS service for AJAX)
- Private `_submissionCount` variable
- Public methods returned in factory object
- Reusable across all controllers

### 4. formController.js (Controller)

```javascript
angular.module('contactApp').controller('FormController', [
  '$scope',      // View-Controller bridge
  '$timeout',    // Delay execution
  'FormService', // Our custom factory
  function($scope, $timeout, FormService) {

    // Initialize scope
    $scope.formData = { name: '', email: '', message: '' };
    $scope.isSubmitting = false;
    $scope.submitStatus = null;

    // Handle form submission
    $scope.submitForm = function() {
      var validation = FormService.validateForm($scope.formData);
      if (validation.isValid) {
        FormService.submitFormToSupabase(data)
          .then(
            function(response) { /* success */ },
            function(error) { /* error */ }
          );
      }
    };

    // Reset form
    $scope.resetForm = function() {
      $scope.formData = { };
      $scope.contactForm.$setPristine();
    };

    // Watch for changes
    $scope.$watch('submitStatus', function(newVal) {
      console.log('Status changed to:', newVal);
    });
  }
]);
```

---

## Learning Exercises

### Exercise 1: Add a New Field
1. Add a phone number field to the HTML
2. Add validation in FormService (e.g., 10 digits)
3. Update form submission to include phone number
4. Test it works

**Steps:**
- Edit `index.html`: Add `<input ng-model="formData.phone">`
- Edit `formService.js`: Add phone validation
- Test in browser

### Exercise 2: Add a Custom Service (Provider)
Create a notification service to display toast messages.

```javascript
angular.module('contactApp').provider('NotificationService', function() {
  this.defaultTimeout = 3000;
  
  this.$get = function($timeout) {
    return {
      show: function(message, type) {
        // Show notification
      }
    };
  };
});
```

### Exercise 3: Implement Form History
Keep a list of submitted forms in localStorage using a factory.

```javascript
angular.module('contactApp').factory('FormHistoryService', function() {
  return {
    save: function(formData) { },
    getAll: function() { },
    clear: function() { }
  };
});
```

### Exercise 4: Add Real-time Validation Feedback
Use `$watch` to validate fields as user types instead of on submit.

### Exercise 5: Create a Custom Directive
Make a custom directive `ng-validate-email` that validates email in real-time.

```javascript
angular.module('contactApp').directive('validateEmail', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$validators.email = function(modelValue) {
        // Custom validation logic
      };
    }
  };
});
```

---

## Debugging Tips

### 1. Use Browser Console
Open DevTools (F12) to see console logs:
```
AngularJS Application Initialized
Module: contactApp created
FormService (Factory) loaded
FormController loaded
```

### 2. Inspect $scope
In browser console:
```javascript
// Get controller scope
var scope = angular.element(document.querySelector('[ng-controller]')).scope();
console.log(scope.formData);
```

### 3. Use AngularJS Inspector
Install "AngularJS Inspector" Chrome extension to inspect scopes and services.

### 4. Watch $scope Changes
Already implemented in our controller:
```javascript
$scope.$watch('submitStatus', function(newVal, oldVal) {
  console.log('Submit status changed:', oldVal, '->', newVal);
});
```

### 5. Add Debug Logs
Add `console.log()` in controller methods to trace execution flow.

---

## Important AngularJS Services

| Service | Purpose |
|---------|---------|
| `$scope` | Two-way data binding, watches, model |
| `$http` | AJAX requests (GET, POST, etc.) |
| `$timeout` | Schedule function execution |
| `$q` | Promise handling |
| `$location` | Current URL |
| `$window` | Global window object |
| `$document` | Global document object |

---

## Next Steps

1. **Experiment** - Modify the code, add console logs, see what breaks
2. **Read** - Study each file in detail
3. **Practice** - Complete the exercises above
4. **Learn Advanced** - Directives, Filters, Animations, Routing
5. **Move to Modern** - Angular 2+ uses similar concepts but with TypeScript and RxJS

Good luck learning AngularJS!
