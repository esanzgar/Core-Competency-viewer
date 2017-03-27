# Core-Competency-viewer
- [View poject milestones](https://github.com/ebiwd/Core-Competency-viewer/milestones?direction=asc&sort=due_date&state=open)
- [View Knowledge Base prototype](https://ebiwd.github.io/Core-Competency-viewer/knowledge-base.html)
- [KB source data sheet](https://docs.google.com/spreadsheets/d/1R75b-HpHg0omN4FpdRLVNJpN0efmw5eGeSV5xA8xSlY/edit#gid=756395543)

This current iteration is a prototype to help demonstrate the IA for BioExcel Core Competency Profile. It shows only the KB aspect.

## The display
Columns from the Core Competency spreadsheet + BioSchemas mandatory fields (name, startDate, endDate, description, location, contact, hostInstitution, eventType) with some user tools (sort, keyword filter, facets, etc.)

## The KB data model as a subset of Core Competency
  - Each entry in the KB contains at least one Competency Mapping ID (competencyMapping)
  - Each entry in the KB contains a UUID
  
[More about the data model in this Google Doc](https://calendar.google.com/calendar/render?pli=1#main_7)
