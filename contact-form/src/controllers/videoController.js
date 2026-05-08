
mainApp.controller('VideoController',function($scope){
    let newVideo = {
        id:"",
        title:"",
        length:5
    }
    $scope.videos = [{
        title: "React tutorial",
        length: "1h20m"
    },{
        title: "Angular tutorial",
        length: "1h3s0m"
    },{

        title: "Http tutorial",
        length: "1h25m"
    }]
    $scope.isEditVisible = false;
    $scope.showEdit = function(){
        console.log("edit clicked")
        $scope.isEditVisible = true
    }
    $scope.dismiss = function(){
        $scope.isEditVisible = false
    }

    $scope.saveVideo = function(){
        $scope.videos.push($scope.newVideo)
    }
})