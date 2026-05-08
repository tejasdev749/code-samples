
angular.module('videoList').component('videoList',{
    template:  "<div>" +
    "<table>" +
        "<thead>" +
          "<th>Title</th>" +
          "<th>Length</th>" +
          "<th></th>" +
        "</thead>" +
        "<tbody>" +
          '<tr ng-repeat="video in $ctrl.videos">' +
            "<td>{{video.title}}</td>" +
            "<td>{{video.length}}</td>" +
          "</tr>" +
        "</tbody>" +
      "</table>" +
      '<button ng-click="$ctrl.showEdit()">Show Edit</button>' +
            '<button ng-click="$ctrl.dismiss()">Dismiss</button>' +
      '<div ng-show="$ctrl.isEditVisible">' +
        '<form ng-submit="$ctrl.saveVideo()">' +
            "<hr/>" +
            '<input type="hidden" name="id" value=""/>' +
            "<div>" +
            '<label for="title">Title:</label>' +
            '"<input type="text" ng-model="$ctrl.newVideo.title" required/>' +
            "</div>" +
            "<div>" +
                '<label for="length">Length</label>' +
                '<input type="number" ng-model="$ctrl.newVideo.length" min="1" max="360s"/>' +
            "</div>" +
            '<input type="submit" value="Submit"/>' +
        "</form>" +
      "</div>" + 
      "</div>",
    controller: function VideoListController(){
    this.newVideo = {
        id:"",
        title:"",
        length:5
    }
    this.videos = [{
        title: "React tutorial",
        length: "1h20m"
    },{
        title: "Angular tutorial",
        length: "1h3s0m"
    },{

        title: "Http tutorial",
        length: "1h25m"
    }]
    this.isEditVisible = false;
    this.showEdit = function(){
        this.isEditVisible = true
    }
    this.dismiss = function(){
        this.isEditVisible = false
    }

    this.saveVideo = function(){
        this.videos.push({...this.newVideo})
    }
}
})  