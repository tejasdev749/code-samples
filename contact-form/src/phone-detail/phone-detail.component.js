angular.module('phoneDetail').component("phoneDetail", {
  template: 'TBD Detail view for <span>{{$ctrl.phoneId}}</span>',
  controller: ['$routeParams', function PhoneDetailController($routeParams) {
      this.phoneId = $routeParams.phoneId
      const that = this
    $http.get('phone-' + that.phoneId + '.json').then(function(response){
      that.phone = response.data
    })
  }],
});
