var app = angular.module ('converterApp',[]);

app.controller('mainController',function($scope,$http) {

    const accessKey = 'aec40b469dc0714627910130c14d78bf'
    $scope.error  ={
        msg : 'Please fill the input box',
        value : false
    };
    $scope.result = 0;

    // get list of currencies
    $http({method: 'GET', url: `http://data.fixer.io/api/latest?access_key=${accessKey}`})
        .then(function (data) {
                $scope.data = data.data.rates;
                $scope.source = (data && data.data && data.data.rates) ? Object.keys(data.data.rates) : null;
            },
        function (err) {
            console.log(err);
        });

    $scope.checkInput = function (){
        $scope.error.value = $scope.inputValue ? false : true;
        getTheTotalAmount();
    }
    // when source is selected
    $scope.sourceSelected = function (){
        $scope.error.value  = $scope.inputValue ? false : true

        // exclude the selected source from target.
        let tempTarget = JSON.parse(JSON.stringify($scope.source));
        const index = $scope.selectedSource ? tempTarget.indexOf($scope.selectedSource) : null ;
        (index >-1) ? tempTarget.splice(index,1)  : null;
        $scope.target = tempTarget;

        $scope.selectedTarget = ($scope.selectedTarget == $scope.selectedSource ) ? null : $scope.selectedTarget;
        getTheTotalAmount();

    }

    // when target is selected
    $scope.targetSelected = function (){
        getTheTotalAmount();
    }

    // get the amount against target and source currency
    let getTheTotalAmount  = function(){
        if ($scope.selectedSource && $scope.selectedTarget && $scope.inputValue){
            $http({method: 'GET', url: `http://data.fixer.io/api/convert?access_key=${accessKey}&from=${$scope.selectedSource}&to=${$scope.selectedTarget}&amount=${$scope.inputValue}&format=1`})
                .then(function (data) {
                        $scope.result = data.data.result +  ' ' + $scope.selectedTarget;
                    },
                    function (err) {
                        console.log(err);
                    });
        }
        else {
            $scope.result = 0;
        }

    }
});


