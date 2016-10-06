var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.selection']);

app.controller('MainCtrl', ['$scope', function($scope) {

  $scope.gridOptions = {
    enableSorting: true,
    columnDefs: [{
      name: 'firstName',
      field: 'firstname'
    }, {
      name: '1stFriend',
      field: 'friends'
    }, {
      name: 'city',
      field: 'address.city'
    }, {
      name: 'getZip',
      field: 'getZip()',
      enableCellEdit: false
    }],
    data: [{
      "firstname": "Mitesh",
      "friends": "J.C.",
      "address": {
        street: "60th Ave",
        city: "Plymouth",
        zip: "55446"
      },
      "getZip": function() {
        return this.address.zip;
      }

    }, {
      "firstname": "Mitesh1",
      "friends": "Jeff",
      "address": {
        street: "60th Ave",
        city: "Plymouth",
        zip: "55446"
      },
      "getZip": function() {
        return this.address.zip;
      }
    }]
  };
  $scope.gridOptions.onRegisterApi = function(gridApi) {
    $scope.gridApi = gridApi;
  }

  $scope.copyRows = function() {

    var selectedObject = $scope.gridApi.selection.getSelectedRows(),
      newData = [],
      selectedIndexData = [],
      newDataArray = [];

    angular.forEach(selectedObject, function(data) {
      newData = angular.copy(data);
      newData.firstname = newData.firstname + "Copy"; // This is to change some primary key values
      selectedIndexData.push($scope.gridOptions.data.indexOf(data));
    });

    for (var i = 0; i < newDataArray.length; i++) {
      $scope.gridOptions.data.splice((selectedIndexData[i] + i + 1), 0, newDataArray[i]); //Insert after selected row
    }
  };

}]);
