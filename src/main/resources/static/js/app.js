// $('#calendar').fullCalendar({
//     header: { center: 'month,agendaWeek' },
//     defaultView: 'agendaWeek',
//     dayClick: function(date, jsEvent, view, resourceObj) {
//         $('#exampleModal').modal();
//     }
// });





var app = angular.module("bookingGrid", []);

app.controller("calender", function($scope, $http) {

});



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

        if(field.options.length == 0){
            field.isOptionErr = true;
        }


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

        field.isOptionErr = false;

    }


    $scope.removeField = function(field) {

        var fieldInd = $scope.resource.fields.indexOf(field);
        $scope.resource.fields.splice(fieldInd, 1);

        //re-order field ids
        for (var i = 1; i <=  $scope.resource.fields.length; i++) {
            var ind = i -1;
            $scope.resource.fields[ind].fieldId = i;
        }

        $scope.lastAddedID = $scope.resource.fields.length;

        $scope.saveResource();

    }


    $scope.editField = function(field) {
        field.edit = true;
        console.log(field);
        $scope.newField = field;
        $('#exampleModal').modal('show');
    }


    $scope.addField = function() {

        $scope.newField = {
            type:'text',
            label:'Field label'
        };
        $('#exampleModal').modal('show');
    }





    $scope.saveField = function(newField) {

        if (newField.type != 'html' &&
            (typeof newField.identifier == 'undefined' || newField.identifier.length < 3 || !validateAlphanumeric(newField.identifier))){
            newField.hasIdentfierError = true;
            newField.identifierErrMsg = 'Invalid identifier field. Minimum length 3 and alphanumeric is allowed.';
            return;
        } else{
            newField.hasIdentfierError = false;
        }



        if( (newField.type == 'radio' || newField.type == 'select' || newField.type == 'check') &&
            (typeof newField.options == 'undefined' || newField.options.length == 0)){
            newField.isOptionErr = true;
            return;
        }


        if(newField.edit){

            console.log("editing")

            var fieldInd = $scope.resource.fields.indexOf(newField);

            for (var i = 0; i <  $scope.resource.fields.length; i++) {
                if($scope.resource.fields[i].identifier == newField.identifier && $scope.resource.fields[i].fieldId != newField.fieldId){
                    newField.hasIdentfierError = true;
                    newField.identifierErrMsg = 'A field with same identifier already exists.';
                    return;
                }
            }


            $scope.resource.fields[fieldInd] = newField;


        } else{



            for (var i = 0; i <  $scope.resource.fields.length; i++) {
                if($scope.resource.fields[i].identifier == newField.identifier){
                    newField.hasIdentfierError = true;
                    newField.identifierErrMsg = 'A field with same identifier already exists.';
                    return;
                }
            }

            $scope.lastAddedID++;
            newField.fieldId = $scope.lastAddedID;
            newField.value = null;
            $scope.resource.fields.push(newField);
        }




        $scope.newField = {type:'text', label:'Field label'};
        $scope.saveResource();
        $('#exampleModal').modal('hide');
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
            console.log("Saved!");
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


function validateAlphanumeric(str) {
    var re = /^[a-z0-9]+$/i;
    return re.test(str);
}

function compare(a,b) {
    if (a.last_nom < b.last_nom)
        return -1;
    if (a.last_nom > b.last_nom)
        return 1;
    return 0;
}

