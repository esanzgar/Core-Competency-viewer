/* @CompetencyDetails()
* @author: Alba Gomez
* @date: 31/07/2017
* @details: Object competency details
* @Attributes:
*		type;
*		details;
* @methods:
*       construct
*       set's and get's for each attribute
*/

function CompetencyDetail() {
	//Attributes declaration
	this.type;
	this.details;

	//methods declaration
	this.construct = function (type, details) { 
		this.setType(type);
		this.setDetails(details);
	}

	//setters
	this.setType = function (type) {this.type=type;}
	this.setDetails = function (details) {this.details=details;}

	//getters
	this.getType = function () {return this.type;}
	this.getDetails = function () {return this.details;}
	
}
