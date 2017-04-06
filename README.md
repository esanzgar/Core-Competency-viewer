# Core-Competency-viewer
- [View project milestones](https://github.com/ebiwd/Core-Competency-viewer/milestones?direction=asc&sort=due_date&state=open)
- [View the prototype](https://ebiwd.github.io/Core-Competency-viewer/)

This current iteration is a prototype to help demonstrate the IA for BioExcel Core Competency Profile. It shows only the KB aspect.

The Competency Profile creates a consistent definition system of competencies based on knowledge, skills and behaviours requirements that can be mapped onto learning resources.

## The display
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
Built with React.js + some of the EBI Framework jQuery stuff. Kernel of approach was based off https://facebook.github.io/react/docs/thinking-in-react.html
