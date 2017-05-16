var app = angular.module("bookstoreApp", [
    'ui.router',
    "ngGrid",
    "bookgridApp"
]);
app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.when('', '/home');
    $stateProvider
        .state('home', {
            url:"/home",
            views:{
                '':{
                    templateUrl: 'tpls/home.html',
                },
                'main@home':{
                    templateUrl: 'tpls/signin.html',
                }
            }
        })
        .state('booklist', {
            url: '/{bookid:[0-9]{1,4}}',
            views: {
                '': {
                    templateUrl: 'tpls/booklist.html'
                },
                'booknav@booklist': {
                    templateUrl: 'tpls/booknav.html'
                },
                'booktab@booklist': {
                    templateUrl: 'tpls/booktab.html'
                }
            }
        })
})