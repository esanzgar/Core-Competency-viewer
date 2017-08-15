//Angular code
(function (){
	//Application module
	angular.module('compentencyProfile').controller("MainController", ['$http', '$scope', '$filter', '$window', function ($http, $scope, $filter, $window){

		//scope variables
		$scope.userOption = 0;
		$scope.knowledgeArray = new Array();
		$scope.competencyArray = new Array();
		$scope.filteredCourses = new Array();
		$scope.domainsArray = new Array();
		$scope.competencyNumber;
		
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
					// "Authorization": "Basic ",
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
								dataSource[i].number += ', ' + dataSource[j].number;
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
						competencyMappingArray = dataSource[i].number.split(', ');

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
				// console.log("UserController", $scope.domainsArray);

				const multipleCancelButton = new Choices('#choices-multiple-remove-button', {
					// choices: [{'value':'HPC'}, {'value':'HADDOCK'}, {'value':'Performance analysis'}, {'value':'Life Science'}, {'value':'GROMACS'}, {'value':'Molecular Dynamics'}],
					choices: $scope.domainsArray,
					delimiter: ',',
					editItems: true,
					maxItemCount: 1,
					// placeholder : false,
					removeItemButton: true,
				});
			})
			.catch(function(response) {
				console.error('Knowledge base error', response.status);
			});
		}

		$scope.loadDataCompetency = function () {
			// $('#interactive').html('JavaScript detected...');
			dataSource = new Array();
			$http({
				url: '//dev-competency-profile.pantheonsite.io/competencies',
				method: 'GET',
				headers: {
					// "Authorization": "Basic ",
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

		this.update = function () {
			$timeout( function () {
				$("#showAll").click();
			});
		}

		$scope.setBackground = function () {
			if ($scope.userOption == 0) {
				return {
					'background-image':'url(http://www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.1/images/backgrounds/training-yellow-5.jpg)'
				}
			} else if ($scope.userOption == 1) {
				return {
					'background-image':'url(http://www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.1/images/backgrounds/industry-blue-4.jpg)'
				}
			}
		}

	}]);

})();
