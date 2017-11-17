/* @Knowledge()
* @author: Alba Gomez
* @date: 18/07/2017
* @description: Object knowledge info
* @Attributes:
*		id;
*       name;
*       competencyMapping: array of compentencies;
*		domain: array of domains;
*		typeOnlineOrFacetoface;
*		typeDetail;
*		url;
*		courseComments;
*		startDate;
*		endDate;
* @methods:
*       construct
*       set's and get's for each attribute
*       addCompetencyMapping
*       removeCompetencyMapping
*       addDomain
*       removeDomain
*/

function Knowledge() {
	//Attributes declaration
	this.id;
	this.name;
	this.competencyMapping = new Array;
	this.domain = new Array();
	this.typeOnlineOrFacetoface;
	this.typeDetail;
	this.url;
	this.courseComments;
	this.startDate;
	this.endDate;

	//methods declaration
	this.construct = function (id, name, competencyMapping, domain, typeOnlineOrFacetoface, typeDetail, url, courseComments) { // provider, providerUrl, bioexcelPartner,
		this.setId(id);
		this.setName(name);
		this.setCompetencyMapping(competencyMapping);
		this.setDomain(domain);
		this.setTypeOnlineOrFacetoface(typeOnlineOrFacetoface);
		this.setTypeDetail(typeDetail);
		this.setUrl(url);
		// this.setProvider(provider);
		// this.setProviderUrl(providerUrl);
		// this.setBioexcelPartner(bioexcelPartner);
		this.setCourseComments(courseComments);
	}

	//setters
	this.setId = function (id) {this.id=id;}
	this.setName = function (name) {this.name=name;}
	this.setCompetencyMapping = function (competencyMapping) {this.competencyMapping=competencyMapping;}
	this.setDomain = function (domain) {this.domain=domain;}
	this.setTypeOnlineOrFacetoface = function (typeOnlineOrFacetoface) {this.typeOnlineOrFacetoface=typeOnlineOrFacetoface;}
	this.setTypeDetail = function (typeDetail) {this.typeDetail=typeDetail;}
	// this.setProvider = function (provider) {this.provider=provider;}
	// this.setProviderUrl = function (providerUrl) {this.providerUrl=providerUrl;}
	// this.setBioexcelPartner = function (bioexcelPartner) {this.bioexcelPartner=bioexcelPartner;}
	this.setUrl = function (url){this.url=url;}
	this.setCourseComments = function (courseComments) {this.courseComments=courseComments;}
	this.setStartDate = function (startDate) {this.startDate=startDate;}
	this.setEndDate = function (endDate) {this.endDate=endDate;}

	//getters
	this.getId = function () {return this.id;}
	this.getName = function () {return this.name;}
	this.getCompetencyMapping = function () {return this.competencyMapping;}
	this.getDomain = function () {return this.domain;}
	this.getTypeOnlineOrFacetoface = function () {return this.typeOnlineOrFacetoface;}
	this.getTypeDetail = function () {return this.typeDetail;}
	// this.getProvider = function () {return this.setProvider;}
	// this.getProviderUrl = function () {return this.providerUrl;}
	// this.getBioexcelPartner = function () {return this.bioexcelPartner;}
	this.getUrl = function () {return this.url;}
	this.getCourseComments = function () {return this.courseComments;}
	this.getStartDate = function () {return this.startDate;}
	this.getEndDate = function () {return this.endDate;}

	this.addCompetencyMapping = function (h) {
		this.competencyMapping.push(h);
	}

	this.removeCompetencyMapping = function (h) {
		for (var i = 0; i < this.getCompetencyMapping().length; i++) {
			if(this.getCompetencyMapping()[i] == h) {
				this.competencyMapping.splice(i,1);
				break;
			}
		}

	}

	this.addDomain = function (h) {
		this.domain.push(h);
	}

	this.removeDomain = function (h) {
		for (var i = 0; i < this.getDomain().length; i++) {
			if(this.getDomain()[i] == h) {
				this.domain.splice(i,1);
				break;
			}
		}

	}
}
