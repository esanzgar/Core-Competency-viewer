// JQuery code
$(document).ready(function() {
    $('.optionClicked li').click(function(e) {
        e.preventDefault();
        $('li').removeClass('active');
        $(this).addClass('active');
        $('#training').addClass('active');
    });
});

//Angular code
(function (){
	//Application module
	angular.module('compentencyProfile').controller("CompetencyController", ['$http', '$scope', '$filter', '$window', function ($http, $scope, $filter, $window) {

		//scope variables
		$scope.competencyArray = new Array();
		
		$scope.loadDataCompetency = function () {
			// $('#interactive').html('JavaScript detected...');
			dataSource = new Array();
			$http({
				url: '//dev-competency-profile.pantheonsite.io/competencies',
				method: 'GET',
				headers: {
					// "Authorization": "Basic",
					"X-CSRF-Token": "FC3YiHYNUrmxB7KXCViHKfqqGyAJ5bx1MK93uuxYC5s", // http://dev-competency-profile.pantheonsite.io/session/token
					"Content-Type": "application/hal+json",
					'Access-Control-Allow-Origin': '*',
					"Access-Control-Allow-Methods": "GET, PUT, POST",
				}
			})
			.then(function(res) {
				// $('#interactive').html('Data fetched...');
				dataSource = res.data; 
				// console.log(dataSource);
				$('#interactiveCompetency').html(''); 

				for (var i = 0; i < dataSource.length; i++) {
					// see if any future rows have same name (that is our unique ID for now)
					for (var j = i+1; j < dataSource.length; j++) {
						if (dataSource[i] != undefined && dataSource[j] != undefined) {
							if (dataSource[i].number === dataSource[j].number) {
								// note the addition
								dataSource[i].type += ', ' + dataSource[j].type;
								dataSource[i].details += ';; ' + dataSource[j].details;
								// remove duplicate entry
								dataSource[j] = undefined;
							} 
						}
					}
				}

				for (var i = 0; i < dataSource.length; i++) {
					if (dataSource[i] != undefined) {
						var typeArray = new Array();
						var detailDescArray = new Array();

						var detailsArray = new Array();
						var competencyObj = new Competency();
						
						typeArray = dataSource[i].type.split(', ');
						detailDescArray = dataSource[i].details.split(';; ');
						
						for (var j = 0; j < typeArray.length; j++) {
							var details = new CompetencyDetail();
							details.construct(typeArray[j], detailDescArray[j]);
							detailsArray.push(details);
						}
						
						competencyObj.construct(dataSource[i].id, dataSource[i].number, dataSource[i].name, detailsArray);

						$scope.competencyArray.push(competencyObj);
					}
				}
				// console.log($scope.competencyArray);
			})
			.catch(function(response) {
				console.error('Competencies error', response.status);
			});
		}

		$scope.findCourses = function (number) {
			// $scope.$parent.competencyNumber = "";
			$scope.$parent.competencyNumber = number;
		}

	}]);

	angular.module('compentencyProfile').directive("competencyTable", function (){
		return {
			restrict: 'E',
			templateUrl:"templates/competency-table.html",
			controller:function(){

			},
			controllerAs: 'competencyTable'
		};
	});

})();
