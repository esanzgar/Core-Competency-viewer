export interface CompetencyVersion {
  nid: string;
  title: string;
  description: string;
  versions: Version[];
}

interface Version {
  id: string;
  uuid: string;
  number: string;
  status: string;
  release_notes: string;
}

export interface Framework {
  uuid: string;
  nid: string;
  title: string;
  description: string;
  version: string;
  release_notes: string;
  type: string;
  domains: Domain[];
}

export interface Domain {
  uuid: string;
  nid?: string; // returned in the competency endpoint `http://dev-competency-mapper.pantheonsite.io/api/bioexcel/1.0/?_format=json`
  id?: string; // returned in the single training resource endpoint `http://dev-competency-mapper.pantheonsite.io/api/resources/?_format=json&id=1034`
  title: string;
  type: string;
  competencies: Competency[];
}

interface Competency {
  uuid: string;
  id: string;
  title: string;
  type: string;
  archived: string;
  mapped_other_competency?: any;
  attributes: Attribute[];
}

interface Attribute {
  uuid: string;
  id: string;
  title: string;
  type: 'Knowledge' | 'Skill' | 'Attitude';
  archived: string;
}

export interface CleanDomain {
  id: string;
  title: string;
  competencies: CleanCompetency[];
}

interface CleanCompetency {
  id: string;
  title: string;
  attributes: Record<'Knowledge' | 'Skill' | 'Attitude', string[]>;
  allNoCase: string;
}
