// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('fruitChart', ['chart.js','ionic'])

.controller('fruitCtrl', function($scope,$ionicModal){
  /*fruits array*/
  $scope.fruits = [
    {name: 'apple', quantity: 2},
    {name: 'orange', quantity: 3},
    {name: 'banana', quantity: 5}
  ];
  $scope.fruitNames = [];
  $scope.fruitQuantity = [];
  setChartData();
  $scope.type = 'Pie';
  $scope.toggleChart = function() {
    var types = ['Pie','PolarArea','Doughnut'];
    if($scope.type == 'Pie') {
      $scope.type = 'PolarArea';
    } else if($scope.type == 'PolarArea'){
      $scope.type = 'Doughnut';
    } else {
      $scope.type = 'Pie';
    }
  };

  $scope.type = 'Pie';
  function setChartData(){
    $scope.fruitQuantity=[];
    $scope.fruitNames=[]
    for (var i = 0; i < $scope.fruits.length; i++) {
      fruit = $scope.fruits[i];
      $scope.fruitNames.push(fruit.name);
      $scope.fruitQuantity.push(fruit.quantity);
    };
  }
  $ionicModal.fromTemplateUrl('new-fruit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openFruitModal = function() {
    $scope.modal.show();
  };
  $scope.closeFruitModal = function() {
    $scope.modal.hide();
  };
  $scope.addFruit = function(fruit){
    if(!fruit.name || !fruit.quantity || fruit.quantity==0){
      return;
    }
    var isExist = false;
    for (var i = 0; i < $scope.fruits.length; i++) {
      var f = $scope.fruits[i];
      if(f.name==fruit.name){
        isExist = true;
        f.quantity = parseInt(f.quantity) + parseInt(fruit.quantity);
        break;
      }
    };
    if (!isExist) {
      var newFruit = {name: fruit.name, quantity: fruit.quantity};
      $scope.fruits.push(newFruit);
    };
    $scope.modal.hide();
    fruit.name="";
    fruit.quantity=0;
    setChartData();
  };
});
/*.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
*/