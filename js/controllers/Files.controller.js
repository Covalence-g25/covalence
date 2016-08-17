angular
   .module('Covalence')
   .controller('FilesController', FilesController);

function FilesController($scope, $stateParams, $state, $http) {
   var database = 'https://console.firebase.google.com/project/covalence-6384b/database/data/projects/pageData.json';
   $http.get(database)

   .then(function (result) {
     console.log("hello");
 })
}
