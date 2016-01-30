app.controller("PortController",['$scope','$location','getJsonData',function($scope,$location,getJsonData){
    $scope.portfolio;
	$scope.searchTerm='';
	$scope.limitNumber;
	$scope.offsetNumber;
	$scope.imgId;
	//A few images Ids: 23715209976
	//Basic search
	$scope.searchPhotos = function(){
		$scope.portfolio=[];
		if ($scope.searchTerm && !$scope.limitNumber){
			getJsonData.searchBasic($scope.searchTerm, function(tmpl){
				$scope.portfolio=tmpl;
			});
		}
		else if ($scope.limitNumber && !$scope.offsetNumber){
			getJsonData.searchLimit($scope.searchTerm, $scope.limitNumber, function(tmpl){
				$scope.portfolio=tmpl;
			});
		}
		else if ($scope.limitNumber && $scope.offsetNumber){
			getJsonData.searchOffset($scope.searchTerm, $scope.limitNumber, $scope.offsetNumber, function(tmpl){
				$scope.portfolio=tmpl;
			});
		}
		else if ($scope.imgId){
			getJsonData.searchOImgId($scope.imgId, function(tmpl){
				$scope.portfolio.photo=[];
				$scope.portfolio.photo[0]=tmpl.photo;
			});
		}
	};
	
    $scope.getImagePath = function(photo) {
		return 'https://farm{'+photo.farm+'}.staticflickr.com/{'+photo.server+'}/{'+photo.id+'}_{'+photo.secret+'}.jpg';
    };
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $('.my-container').sortablePhotos({
			selector: '> .my-item',
            sortable: false,
            padding: 2
            });
        });
}]);