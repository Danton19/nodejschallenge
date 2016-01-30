app.controller("MainController",['$scope','$location','getJsonData',function($scope,$location,getJsonData){
    $scope.portfolio;
    $scope.items=[
        {
            path:'portfolio',
            title:'Flickr Pics'
        }
        ];
        $scope.scrollAnim= function(){
            var adjustment;
            if($( window ).width() < 775){
                adjustment=150;
                $('.navbar-toggle').click();
            }
            else
                adjustment=90;
            
            $("body").animate({
            scrollTop: $("body").offset().top - adjustment
        }, 700);
        };
}]);