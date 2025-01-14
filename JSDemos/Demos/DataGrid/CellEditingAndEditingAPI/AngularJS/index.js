const DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', ($scope) => {
  const employeesStore = new DevExpress.data.ArrayStore({
    key: 'ID',
    data: employees,
  });

  $scope.selectedItemKeys = [];
  $scope.disabled = true;

  $scope.dataGridOptions = {
    dataSource: employeesStore,
    showBorders: true,
    paging: {
      enabled: false,
    },
    editing: {
      mode: 'cell',
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true,
    },
    selection: {
      mode: 'multiple',
    },
    onSelectionChanged(data) {
      $scope.selectedItemKeys = data.selectedRowKeys;
      $scope.disabled = !$scope.selectedItemKeys.length;
    },
    columns: [
      {
        dataField: 'Prefix',
        caption: 'Title',
        width: 55,
      },
      'FirstName',
      'LastName', {
        dataField: 'Position',
        width: 170,
      }, {
        dataField: 'StateID',
        caption: 'State',
        width: 125,
        lookup: {
          dataSource: states,
          displayExpr: 'Name',
          valueExpr: 'ID',
        },
      }, {
        dataField: 'BirthDate',
        dataType: 'date',
      },
    ],
    toolbar: {
      items: [
        {
          name: 'addRowButton',
          showText: 'always',
        }, {
          location: 'after',
          widget: 'dxButton',
          options: {
            text: 'Delete Selected Records',
            icon: 'trash',
            onClick() {
              $.each($scope.selectedItemKeys, function () {
                employeesStore.remove(this);
              });
              $('#gridContainer').dxDataGrid('instance').refresh();
            },
            bindingOptions: {
              disabled: 'disabled',
            },
          },
        },
      ],
    },
  };
});
