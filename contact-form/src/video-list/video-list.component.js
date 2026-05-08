
angular.module('videoList').component('videoList',{
    templateUrl: 'video-list/video-list.template.html' ,
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