// JQuery code
$(document).ready(function() {
	// $("#knowledgeBaseTable").tablesorter();

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
	angular.module('compentencyProfile').controller("KnowledgeController", ['$http', '$scope', '$filter', '$window', '$timeout', function ($http, $scope, $filter, $window, $timeout) {

		//scope variables
		$scope.types = Array();
		$scope.selectOnline = true;
		$scope.selectFaceToFace = true;

		// $("select").change(function() {
		//		$scope.domainFilter = $(this).val();
		// });

		$scope.includeType = function (type) {
			var i = $.inArray(type, $scope.types);
			if (i > -1) {
				$scope.types.splice(i, 1);
			} else {
				$scope.types.push(type);
			}
		}

		$scope.typeOnlineOrFaceToFace = function (knowledge) {
			if ($scope.types.length > 0) {
				if ($.inArray(knowledge.typeOnlineOrFacetoface, $scope.types) > -1) {
					return;
				}
			} 
			return knowledge;
		}

		$scope.seeCompetency = function (numberCompetency) {
			$scope.$parent.userOption = 1;
			angular.element("#linkCompetencies").addClass('active');
			angular.element("#linkKnowledges").removeClass('active');
		}

		$scope.reloadPage = function () {
			$scope.types = Array();
			if ($scope.selectFilterOption != "" && $scope.selectFilterOption != undefined) {
				$scope.selectFilterOption = "";
				$timeout( function () {
					$(".choices__button").click();
					document.getElementById("typeFilterKnowledge").focus();
				});
				$("select").focus(function(){
			        $(".choices__list").css("display", "none");
			    });
			}
			if (!$scope.selectFaceToFace) {
				$scope.selectFaceToFace = true;
			}
			if (!$scope.selectOnline){
				$scope.selectOnline = true;
			}
			if ($scope.typeFilterKnowledge != "" && $scope.typeFilterKnowledge != undefined) {
				$scope.typeFilterKnowledge = "";
			}
			// $scope.$parent.loadDataKnowledge();
		}
		
	}]);
	
	angular.module('compentencyProfile').directive("knowledgeTable", function () {
		return {
			restrict: 'E',
			templateUrl:"templates/knowledge-table.html",
			controller:function(){

			},
			controllerAs: 'knowledgeTable'
		};
	});

})();




