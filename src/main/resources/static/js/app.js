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
        $scope.newField.lastAddedID = response.data.fields.length;
    },function (error){

    });


    $scope.addField = function() {

        $scope.newField.lastAddedID++;

        var newField = {
            "fieldId" : $scope.newField.lastAddedID,
            "type" : $scope.newField.type,
            "name" : $scope.newField.identifier,
            "label" : "New field - " + $scope.newField.lastAddedID,
            "value": null,
            "hasError": null,
            "errMsg": null,
            "helpText": null,
            "options": [],
            "validations": []
        };

        $scope.resource.fields.push($scope.newField);

        console.log("Adding new field");

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



