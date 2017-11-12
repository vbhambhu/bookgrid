var app = angular.module("bookingGrid", []);


app.controller("resourceList", function($scope, $http) {

    $scope.createResource = function(name) {

        if(name.length == 0){
            $scope.nameErr = true;
            return;
        }


        $http({
            method: 'POST',
            url: '/api/resource/create',
            dataType: 'json',
            params: {name: name},
            headers: {
                "Content-Type": "application/json",
            },
            cache: false,
            processData: false
        }).then(function(response) {
            if(response.status === 200){
                console.log('created')
                window.location.replace("/resource/edit?id="+response.data.id);
            }
        });




        console.log(name)
    }




});



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


    $scope.removeField = function(field) {

        var fieldInd = $scope.resource.fields.indexOf(field);
        $scope.resource.fields.splice(fieldInd, 1);
        $scope.saveResource();

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
        field.helpText = null;

        $scope.resource.fields.push(field);

        field = {};

        $scope.saveResource();
        $('#exampleModal').modal('hide')
        

    }



    $scope.saveResource = function() {

        console.log($scope.resource);

        $http({
            method: 'POST',
            url: '/api/resource/save',
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



