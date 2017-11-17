/* @Competency()
* @author: Alba Gomez
* @date: 26/07/2017
* @description: Object competency info
* @Attributes:
*		id;
*       number;
*       name;
*		details
* @methods:
*       construct
*       set's and get's for each attribute
*       addDetail
*       removeDetail
*/

function Competency() {
	//Attributes declaration
	this.id;
	this.number;
	this.name;
	this.details = new Array();

	//methods declaration
	this.construct = function (id, number, name) { 
		this.setId(id);
		this.setNumber(number);
		this.setName(name);
	}

	//setters
	this.setId = function (id) {this.id=id;}
	this.setNumber = function (number) {this.number=number;}
	this.setName = function (name) {this.name=name;}
	this.setDetails = function (details) {this.details=details;}

	//getters
	this.getId = function () {return this.id;}
	this.getNumber = function () {return this.number;}
	this.getName = function () {return this.name;}
	this.getDetails = function () {return this.details;}
	
	this.addDetail = function (h) {
		this.details.push(h);
	}

	this.removeDetail = function (h) {
		for (var i = 0; i < this.getDetails().length; i++) {
			if(this.getDetails()[i] == h) {
				this.details.splice(i,1);
				break;
			}
		}

	}

}
