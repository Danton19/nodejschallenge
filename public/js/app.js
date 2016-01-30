//ANGULAR SITE
//app
var app = angular.module('nodeApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    //$urlRouterProvider.otherwise("/portfolio");
    
    $stateProvider
        .state('portfolio',{
            url:"portfolio",
            controller:"PortController",
            templateUrl:"public/views/portfolio.html"
        })
});