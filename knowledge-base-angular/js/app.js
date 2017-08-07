// jQuery code
$(document).ready(function () {
	// $("#searchfilter").select2();
});

// Angular code
(function(){
	var knowledgeApp = angular.module('KnowledgeApp', []);
  
	knowledgeApp.controller("KnowledgeController", function($scope, $http) {
		// Scope variables
		$scope.dataObjs = Array();
		$scope.types = Array();
		$scope.knowledgeObj = new Knowledge();
		$scope.select2Domains = new Array();
		// $scope.select2Domains = ["hola", "adios"];
		$scope.inputFilter = "";

		// Functions
		this.loadData = function () {
			$('#interactive').html('JavaScript detected...');
			var jsonFile = '../../datasets/ebi-cp-knowledge-base.json';
			var dataSource = Array();
			$http.get(jsonFile)
				.then(function(res){
				$('#interactive').html('Data fetched...');
				dataSource = res.data;  
				$('#interactive').html(''); 
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
					var knowledgeObj = new Knowledge();
					knowledgeObj = dataSource[i];
					if (knowledgeObj != undefined) {
						$scope.dataObjs.push(knowledgeObj);
					}
				}
				console.log($scope.dataObjs);   

				$("#searchfilter").select2({
					placeholder: "Filter by a keyword or two",
					width: 1170,
					minimumResultsForSearch: -1,
					tags: true,
					allowClear: true,
					selectOnBlur: true,
					
				});    

				$('#searchfilter').on('change', function(){
				    // console.log('user added new query');
				    // console.log('val searchfilter', $('#searchfilter').val());
				    $scope.inputFilter = $('#searchfilter').val().join(" ");
				    // console.log('val inputFilter', $scope.inputFilter);
				    $('#searchfilter').parent().find($('.button')).click();
			    });

			    var searchSelect = document.getElementById('searchfilter');
				searchSelect.style.visibility = 'hidden';
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

		$scope.typeFilter = function (knowledge) {
		 	if ($scope.types.length > 0) {
				if ($.inArray(knowledge.typeOnlineOrFacetoface, $scope.types) > -1) {
					return;
				}
			} 
		 	return knowledge;
		}

		this.submitQuery = function () {
			
		 	console.log('form submit');
		}

	});

	knowledgeApp.directive("knowledgeTable",function(){
		return{
			restrict: 'E',
			templateUrl:"templates/knowledge-table.html",
			controller: function() {

			},
			controllerAs: 'knowledgeTable'
		};
	});
})();



