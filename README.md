# Core-Competency-viewer
- [View project milestones](https://github.com/ebiwd/Core-Competency-viewer/milestones?direction=asc&sort=due_date&state=open)
- [View the prototype](https://ebiwd.github.io/Core-Competency-viewer/)
  - [Core Competencies](https://ebiwd.github.io/Core-Competency-viewer/core-competency)
  - [Knowledge Resources](https://ebiwd.github.io/Core-Competency-viewer/knowledge-base)
  - [Last version](https://ebiwd.github.io/Core-Competency-viewer/last_version)

The Competency Profile is a definition system of competencies based on knowledge, skills and behaviour requirements. These three (KSB) are mapped onto training resources.

What you find here is a prototype to help demonstrate and understand the IA and APIs for the BioExcel Core Competency Profile project.

## The structure
See: https://swaggerhub.com/apis/alba/obi_training_knowledge_framework/1.0.0

### The display
Columns from the Core Competency spreadsheet + BioSchemas mandatory fields (name, startDate, endDate, description, location, contact, hostInstitution, eventType) with some user tools (sort, keyword filter, facets, etc.)

### Required data fields
- TrainingResourceMapping
- name
- domain
- typeOnlineOrFacetoface
- typeDetail
- url
- ~~bioexcelPartner~~ _currently not used in front end_
- courseComments (bioschemas: description)
- startDate (bioschemas)
- endDate (bioschemas)
- location (bioschemas)
- contact (bioschemas)
- hostInstitution (bioschemas)
- eventType (bioschemas)

[View KB source data sheet](https://docs.google.com/spreadsheets/d/1R75b-HpHg0omN4FpdRLVNJpN0efmw5eGeSV5xA8xSlY/edit#gid=756395543)

## The KB data model as a subset of Core Competency
  - Each entry in the KB contains at least one Competency Mapping ID (competencyMapping)
  - Each entry in the KB contains a UUID
  - [More about the data model in this Google Doc](https://calendar.google.com/calendar/render?pli=1#main_7)

## About the viewer
Built with Angular.js + some of the EBI Framework jQuery stuff. 
