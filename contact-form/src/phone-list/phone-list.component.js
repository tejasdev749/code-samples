angular.module('phoneList').component("phoneList", {
  templateUrl: 'phone-list/phone-list.template.html',
  controller: function PhoneListController() {
    this.phones = [
      {
        name: "Nexus S",
        snippet: "Fast just got faster with Nexus S.",
        age: 3,
      },
      {
        name: "Motorola XOOM™ with Wi-Fi",
        snippet: "The Next, Next Generation tablet.",
        age: 5
      },
      {
        name: "MOTOROLA A1™",
        snippet: "The Next, Next Generation tablet.",
        age:1
      },
      {
        name: "Nokia XOOM™",
        snippet: "The Next, Next Generation tablet.",
        age: 2
      }
    ];
    this.orderProp = 'age'
  },
});
