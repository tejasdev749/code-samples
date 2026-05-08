angular.module('phoneList').component("phoneList", {
  templateUrl: 'phone-list/phone-list.template.html',
  controller: ['$http', function PhoneListController($http) {
    const that = this
    $http.get('phones.json').then(function(response){
      that.phones = response.data.phones.slice(0,2)
    })
    this.orderProp = 'age'
  }],
});
