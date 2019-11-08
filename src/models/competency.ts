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
  nid: string;
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
  attributes: (Attribute | Attribute)[];
}

interface Attribute {
  uuid: string;
  id: string;
  title: string;
  type: 'Knowledge' | 'Skill' | 'Attitude';
  archived: string;
}
