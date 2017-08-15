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
	angular.module('compentencyProfile').controller("CompetencyController", ['$http', '$scope', '$filter', '$window', function ($http, $scope, $filter, $window){

		//scope variables
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
