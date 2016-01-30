app.factory('getJsonData',['$http',function($http){
    return {
        searchBasic:function(searchTerm, callback){
            $http.get('/searchTerm/'+ searchTerm)
            .success(function(data){
                callback(data);
            })
            .error(function(err){
                return err;
            });
        },
		searchLimit:function(searchTerm, limit, callback){
            $http.get('/searchTerm/'+ searchTerm + '/' + limit)
            .success(function(data){
                callback(data);
            })
            .error(function(err){
                return err;
            });
        },
		searchOffset:function(searchTerm, limit, offset, callback){
            $http.get('/searchTerm/'+ searchTerm + '/' + limit + '/' + offset)
            .success(function(data){
                callback(data);
            })
            .error(function(err){
                return err;
            });
        },
		searchOImgId:function(id, callback){
            $http.get('/image/' + id)
            .success(function(data){
                callback(data);
            })
            .error(function(err){
                return err;
            });
        },
		
    }
}]);