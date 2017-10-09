//Angular code
(function (){
	//Application module
	angular.module('compentencyProfile').controller("CompetencyController", ['$http', '$scope', '$filter', '$window', function ($http, $scope, $filter, $window) {

		//scope variables
		
		$scope.knowledgeByCompetency = function (number) {
			$scope.$parent.competencyNumber = number;
			$scope.$parent.userOption = 0;
		}

	}]);

	angular.module('compentencyProfile').directive("competencyProfile", function (){
		return {
			restrict: 'E',
			templateUrl:"templates/competency-profile.html",
			controller:function(){

			},
			controllerAs: 'competencyProfile'
		};
	});

})();
