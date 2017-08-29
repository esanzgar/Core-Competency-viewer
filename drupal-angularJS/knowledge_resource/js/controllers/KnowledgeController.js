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
	angular.module('compentencyProfile').controller("KnowledgeController", ['$http', '$scope', '$filter', '$window', '$timeout', function ($http, $scope, $filter, $window, $timeout) {

		//scope variables
		$scope.knowledgeArray = new Array();
		$scope.filteredCourses = new Array();
		$scope.domainsArray = new Array();
		$scope.types =  new Array();
		$scope.selectOnline = true;
		$scope.selectFaceToFace = true;
		
		$scope.$watch("competencyNumber", function () {
			$scope.filteredCourses = $filter('filter')($scope.knowledgeArray,{competencyMapping:$scope.competencyNumber});
			$scope.userOption = 0;
			$("#linkCompetencies").removeClass('active');
			$("#linkKnowledges").addClass('active');
		})

		function containsObject(list, obj) {
			for (var i = 0; i < list.length; i++) {
				if (list[i].name === obj.name) {
					return true;
				}
			}
			return false;
		}

		$scope.loadDataKnowledge = function () {
			// $('#interactive').html('JavaScript detected...');
			var dataSource = new Array();
			$http({
				url: '//dev-competency-profile.pantheonsite.io/knowledge_base',
				method: 'GET',
				headers: {
					// "Authorization": "Basic",
					"X-CSRF-Token": "FC3YiHYNUrmxB7KXCViHKfqqGyAJ5bx1MK93uuxYC5s", // http://dev-competency-profile.pantheonsite.io/session/token
					"Content-Type": "application/hal+json",
					'Access-Control-Allow-Origin': '*',
					"Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, X-PINGOTHER",
					"Access-Control-Allow-Methods": "GET, PUT, POST",
				}
			})
			.then(function(res) {
				// $('#interactive').html('Data fetched...');
				dataSource = res.data;
				// console.log(dataSource);
				$('#interactiveKnwoledge').html(''); 
				
				for (var i = 0; i < dataSource.length; i++) {
					// see if any future rows have same name (that is our unique ID for now)
					for (var j = i+1; j < dataSource.length; j++) {
						if (dataSource[i] != undefined && dataSource[j] != undefined) {
							if (dataSource[i].name === dataSource[j].name) {
								// note the addition
								dataSource[i].competencyNumber += '; ' + dataSource[j].competencyNumber;
								dataSource[i].competencyName += '; ' + dataSource[j].competencyName;
								// remove duplicate entry
								dataSource[j] = undefined;
							} 
						}
					}
				}
				
				for (var i = 0; i < dataSource.length; i++) {
					if (dataSource[i] != undefined) {
						var domainsArray = new Array();
						var competencyMappingArray = new Array();

						var knowledgeObj = new Knowledge();

						domainsArray = dataSource[i].domains.split(', ');
						numbers = dataSource[i].competencyNumber.split('; ');
						names = dataSource[i].competencyName.split('; ');
						for (k = 0; k < numbers.length; k++) {
							competencyMappingArray.push({'name':names[k], 'number':numbers[k]});
						}

						knowledgeObj.construct(dataSource[i].id, dataSource[i].name, competencyMappingArray, domainsArray, dataSource[i].typeOnlineOrFacetoface, dataSource[i].eventType, dataSource[i].url, dataSource[i].courseComments);

						if (!containsObject($scope.knowledgeArray, knowledgeObj)) {
							$scope.knowledgeArray.push(knowledgeObj);
						}
						for (var j=0; j < domainsArray.length; j++) {
							if($scope.domainsArray.indexOf(domainsArray[j]) == -1) {
								$scope.domainsArray.push({'value':domainsArray[j]});
							}
						}
					}
				}
				
				$scope.filteredCourses = $scope.knowledgeArray;
				// console.log($scope.knowledgeArray);
				// console.log($scope.domainsArray);
				
				const multipleCancelButton = new Choices('#choices-multiple-remove-button', {
					// choices: [{'value':'HPC'}, {'value':'HADDOCK'}, {'value':'Performance analysis'}, {'value':'Life Science'}, {'value':'GROMACS'}, {'value':'Molecular Dynamics'}],
					choices: $scope.domainsArray,
					delimiter: ',',
					editItems: true,
					// maxItemCount: 1,
					// placeholder : false,
					removeItemButton: true,
				});
				
			})
			.catch(function(response) {
				console.error('Knowledge base error', response.status);
			});
		}
		
		$scope.includeType = function (type) {
			var i = $.inArray(type, $scope.types);
			if (i > -1) {
				$scope.types.splice(i, 1);
			} else {
				$scope.types.push(type);
			}
		}

		$scope.filterOnlineOrFaceToFace = function (knowledge) {
			if ($scope.types.length > 0) {
				if ($.inArray(knowledge.typeOnlineOrFacetoface, $scope.types) > -1) {
					return;
				}
			} 
			return knowledge;
		}

		$scope.filterByDomain = function (knowledge) {
			// for (var i = 0; i < knowledge.domain.length; i++) {
			// 	var matches = 0;
			// 	if ($.inArray(knowledge.domain[i], $scope.selectedDomains) > -1) {
			// 		matches++;
			// 	}
			// }
			// if (matches != $scope.selectedDomains.length) {
			// 	return;
			// }
			return knowledge;
		}

		$scope.reloadPage = function () {
			$scope.types = Array();
			$scope.$parent.competencyNumber = "";
			if ($scope.selectedDomains != "" && $scope.selectedDomains != undefined) {
				$scope.selectedDomains = "";
				$timeout(function () {
					$(".choices__button").click();
					document.getElementById("typeFilterKnowledge").focus();
				});
				$("select").focus(function (){
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
		}

		$scope.tooltipClick = function (number, name) {
			var myEl = angular.element( document.querySelector('#tooltip_content') );
			myEl.html('<p style="text-align:left;">'+
				'<strong>Competency '+number+'</strong><br>'+name+'<br>'+
				' <a data-ng-href="#'+number+'" data-ng-click="seeCompetency('+number+')">See more</a>'+
				'</p>'
			);
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

	angular.module('compentencyProfile').directive('tooltipster', [ function () {
		return {
			restrict: 'A',
			link: function ($scope, $element, $attrs) {
				$element.tooltipster(jQuery.extend({
					theme: 'tooltipster-shadow',
					maxWidth: 500,
					side: 'right',
					trigger: 'click',
					contentAsHTML: true,
					interactive: true,
				}));
			}
		};
	}]);

})();




















