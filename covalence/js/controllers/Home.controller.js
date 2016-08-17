angular
   .module('Covalence')
   .controller('HomeController', HomeController);

 function HomeController($scope, $state) {
   $scope.getResults = function () {
     $state.go('home.movies', {
       movie: $scope.searchResults
     });
   }
 }
