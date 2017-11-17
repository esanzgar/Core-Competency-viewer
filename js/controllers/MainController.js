// Angular code
(function (){
	//Application module
	angular.module('compentencyProfile').controller("MainController", ['$http', '$scope', '$filter', '$window', '$timeout', '$routeParams', function ($http, $scope, $filter, $window, $timeout, $routeParams) {

		//scope variables
		$scope.userOption = 0;
		$scope.competencyArray = new Array();
		$scope.knowledgeArray = new Array();
		$scope.filteredCourses = new Array();
		$scope.domainsArray = new Array();

		$scope.$watch("userOption", function () {
		 	if ($scope.userOption == 0) { // Knowledge view
		 		angular.element('#linkKnowledges').addClass('selected');
		 		angular.element('#linkCompetencies').removeClass('selected');
		 	} else { // Competency view
		 		angular.element('#linkCompetencies').addClass('selected');
		 		angular.element('#linkKnowledges').removeClass('selected');
		 	}
		 	$window.scrollTo(0, 0);
		})

		$scope.loadDataKnowledgeBase = function () {
			var dataSource = new Array();
			$http.get("datasets/ebi-cp-knowledge-base.json")
			.then(function(res) {
				dataSource = res.data;
				// console.log(dataSource);
				for (var i = 0; i < dataSource.length; i++) {
					// see if any future rows have same name (that is our unique ID for now)
					for (var j = i+1; j < dataSource.length; j++) {
						if (dataSource[i] != undefined && dataSource[j] != undefined) {
							if (dataSource[i].name === dataSource[j].name) {
								// note the addition
								dataSource[i].competencyMapping += ', ' + dataSource[j].competencyMapping;
								// remove duplicate entry
								dataSource[j] = undefined;
							}
						}
					}
				}

				for (var i = 0; i < dataSource.length; i++) {
					if (dataSource[i] != undefined) {
						var domainsArrayVar = new Array();
						var competencyNumber = 0;
						var competencyName = "";
						var competencyMappingArray = new Array();

						var knowledgeObj = new Knowledge();

						domainsArrayVar = dataSource[i].domain.split(', ');
						competencyNumber = dataSource[i].competencyMapping.split(', ');

						
						angular.forEach(competencyNumber, function(number){
							angular.forEach($scope.competencyArray, function(value, key) {
								if (value.number == number) {
									competencyMappingArray.push({"number":number, "name":value.name});
								}
							})
						});


						knowledgeObj.construct(i, dataSource[i].name, competencyMappingArray, domainsArrayVar, dataSource[i].typeOnlineOrFacetoface, dataSource[i].typeDetail, dataSource[i].url, dataSource[i].courseComments);
						
						if (dataSource[i].startDate != "") {
							knowledgeObj.setStartDate(dataSource[i].startDate);
						}

						if (dataSource[i].endDate != "") {
							knowledgeObj.setEndDate(dataSource[i].endDate);
						}
						
						if (!containsObject($scope.knowledgeArray, knowledgeObj)) {
							$scope.knowledgeArray.push(knowledgeObj);
						}
						
						for (var j=0; j < domainsArrayVar.length; j++) {
							var exist = $scope.domainsArray.some(function(item) {
								return item.value.includes(domainsArrayVar[j]);
							})
							if (exist === false) {
								$scope.domainsArray.push({value: domainsArrayVar[j]});
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

		$scope.loadDataCompetencyProfile= function () {
			dataSource = new Array();
			$http.get("datasets/ebi-cp-competencies-base.json")
			.then(function(res) {
				dataSource = res.data;
				// console.log(dataSource);
				for (var i = 0; i < dataSource.length; i++) {
					if (dataSource[i] != undefined) {
						var competencyObj = new Competency();
						if(dataSource[i].details == undefined) {
							competencyObj.construct(dataSource[i].id, dataSource[i].number, dataSource[i].name);
						} else {
							var detailsArray = new Array();
							for (var j = 0; j < dataSource[i].details.length; j++) {
								var detail = new CompetencyDetail();
								detail.construct(dataSource[i].details[j].type, dataSource[i].details[j].details);
								detailsArray.push(detail);
							}
							competencyObj.construct(dataSource[i].id, dataSource[i].number, dataSource[i].name);
							competencyObj.setDetails(detailsArray);
						}
						$scope.competencyArray.push(competencyObj);
					}
				}
				// console.log($scope.competencyArray);
			})
			.catch(function(response) {
				console.error('Competencies error', response.status);
			});
		}

		function containsObject(list, obj) {
			for (var i = 0; i < list.length; i++) {
				if (list[i].name === obj.name) {
					return true;
				}
			}
			return false;
		}
	}]);

})();