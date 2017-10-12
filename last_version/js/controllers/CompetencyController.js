//Angular code
(function (){
	//Application module
	angular.module('compentencyProfile').controller("CompetencyController", ['$http', '$scope', '$rootScope', '$filter', '$window', function ($http, $scope, $rootScope, $filter, $window) {

		//scope variables
		
		$scope.knowledgeByCompetency = function (number) {
			$scope.$parent.userOption = 0;
			$rootScope.$broadcast('knowledgeByCompetencyClicked', number);
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
