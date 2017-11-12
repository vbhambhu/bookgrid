var app = angular.module("bookingGrid", []);

app.controller("resourceDesign", function($scope, $http) {


    $scope.newField = {};

    var rid = $("#resourceId").val();
    $http({
        url: '/api/resourcebyid',
        method: 'POST',
        params: { rid: rid },
    }).then(function (response){
        //console.log(response.data);
        $scope.resource = response.data;
        $scope.lastAddedID = response.data.fields.length;
    },function (error){

    });


    $scope.removeOption = function(field, option) {
        field.options.splice(field.options.indexOf(option), 1);
    }

    $scope.addOption = function(field) {

        if(typeof field.option == 'undefined' || typeof field.option.value == 'undefined' || field.option.value.length == 0){
            field.option = {};
            field.option.valueErr = 'true';
            return;
        }

        if(typeof field.option.label == 'undefined' || field.option.label.length == 0){
            field.option = {};
            field.option.labelErr = 'true';
            return;
        }

        if (typeof field.options == 'undefined'){
            field.options = [];
            var lastOptionId = 1;
        } else {
            var lastOptionId = field.options.length + 1;
        }

        var option = {value: field.option.value, label: field.option.label, order: lastOptionId}

        field.options.push(option);
        field.option = {};
    }


    $scope.addField = function(field) {

        if (typeof field.identifier == 'undefined' || field.identifier.length == 0){
            field.hasIdentfierError = 'true';
            return;
        } else{
            field.hasIdentfierError = 'false';
        }


        $scope.lastAddedID++;

        field.fieldId = $scope.lastAddedID;
        field.hasError = null;
        field.errMsg = null;
        field.helpText = null;
        field.validations = [];

        $scope.resource.fields.push(field);

        field = {};

        $('#exampleModal').modal('hide')
        

    }



    $scope.saveResource = function() {

        console.log($scope.resource);

        $http({
            method: 'POST',
            url: '/api/saveresource',
            dataType: 'json',
            data: $scope.resource,
            headers: {
                "Content-Type": "application/json",
            },
            cache: false,
            processData: false
        }).then(function(response) {
            console.log(response);
        });


       // $http.post('/api/saveresource', $scope.resource).then(successCallback, errorCallback);

        // $http({
        //     url: '/api/saveresource',
        //     method: 'POST',
        //
        // }).then(function (response){
        //     console.log(response.data);
        //     //$scope.resource = response.data;
        // },function (error){
        //
        // });

        // $.ajax({
        //     type: "POST",
        //     url: "/api/saveresource",
        //     dataType: 'json',
        //     cache: false,
        //     processData: false,
        //     data: $scope.form,
        //     contentType: 'application/json;charset=UTF-8',
        //     success: function (response) {
        //         console.log(response);
        //     }
        // });


        // $.ajax({
        //     url: '/api/saveresource',
        //     dataType: 'json',
        //     method: 'POST',
        //     data: $scope.form,
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }).success(function(response){
        //     $scope.response = response;
        // }).error(function(error){
        //     $scope.error = error;
        // });

    }

});


app.controller("resourceForm", function($scope, $http) {

    $http({
        url: '/api/getForm',
        method: 'POST',
        params: { rid: $scope.rid },
    }).then(function (response){
        console.log(response.data);
        $scope.resourceForm = response.data;
    },function (error){

    });

});

app.directive('fieldDirective', function ($http, $compile) {

    var getTemplateUrl = function(field) {
        return '/angular/'+field.type;
    }

    var linker = function(scope, element, attrs) {
        // GET template content from path

        var templateUrl = getTemplateUrl(scope.field);

        $http({
            url: templateUrl,
            method: 'GET',
        }).then(function (response){
            //console.log(response.data);
            //$scope.resourceForm = response.data;

             element.html(response.data);
            $compile(element.contents())(scope);
        });


    }

    return {
        restrict: "EA",
        scope: false,
        link: linker,
    };
});



