var bookgrid = angular.module("bookgridApp", ["ngGrid"]);
bookgrid.controller("bookCtrl", ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams) {
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 15, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(
            function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('data/largeLoad.json').then(function successCallback(largeLoad) {
                        data = largeLoad.filter(function (item) {
                            return JSON.stringify(item).indexOf(ft) != -1;
                        })
                        data.forEach(function (item, i) {
                            item.index = i + 1;
                        });
                        $scope.totalServerItems = data.length;
                        $scope.datas = data.slice((page - 1) * pageSize, page * pageSize);
                    }, function errorCallback(largeLoad) {
                        alert('请求错误...');
                    })
                }
                else {
                    $http.get('data/largeLoad.json').then(function successCallback(largeLoad) {
                        data.each(function (item, i) {
                            item.index = i + 1;
                        });
                        $scope.totalServerItems = data.length;
                        $scope.datas = data.slice((page - 1) * pageSize, page * pageSize);
                    }, function errorCallback(largeLoad) {
                        alert('请求错误...');
                    })
                }
            }, 100);
    };
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    $scope.$watch('pagingOptions', function () {

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    }, true);
    $scope.$watch('filterOptions', function () {

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);

    }, true);
    $scope.gridOptions = {
        data: 'datas',
        multiSelect: false, //是否能多选
        enableRowSelection: false, //是否能选择行
        enableCellSelection: true, //是否能选择单元格
        enableCellEdit: false, //是否能修改内容
        enablePinning: true,  //是否被锁住了
        columnDefs: [
            {
                field: 'index', //这里是数据中的属性名
                width: 80,
                display: '序号', //这里是表格的每一列的名称
                pinnable: true,
                sortable: true  //是否能排序
            },
            {
                field: 'name',
                displayName: '姓名',
                width: 120,
                sortable: true,
                pinnable: true
            },
            {
                field: 'alias',
                displayName: '别名',
                width: 60,
                sortable: true,
                pinnable: true
            },
            {
                field: 'position',
                displayName: '定位',
                width: 70,
                sortable: true,
                pinnable: true
            },
            {
                field: 'equip',
                displayName: '装备',
                width: 500,
                sortable: true,
                pinnable: true
            },
            {
                field: 'id',
                displayName: '详细攻略',
                sortable: false,
                pinnable: true,
                cellTemplate: '<div class="cellDetail"><a ui-sref="detail({id:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
            }
        ],
        enablePaging: true, //是否能翻页
        showFooter: true,  //是否显示表尾
        totalServerItems: 'totalServerItems', //数据的总条数 
        pagingOptions: $scope.pagingOptions, //分页部分
        filterOptions: $scope.filterOptions  //数据过滤部分
    }
}]);