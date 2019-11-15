export interface TrainingResource {
  id: string;
  uuid: string;
  title: string;
  type: string;
  dates?: string;
  end_date?: string;
  location?: string;
  description: string;
  url?: string;
  trainers?: string;
  target_audience?: string;
  organisers?: string;
  learning_outcomes?: string;
  keywords?: string;
  archived: string;
  author: string;
  competency_profile: Competencyprofile[];
  allNoCase: string; // To facilitate the search
}

interface Competencyprofile {
  framework_label?: string;
  title?: string;
  domains?: import('./competency').Domain[]; // Only present in the single training resource API end point: `http://dev-competency-mapper.pantheonsite.io/api/resources?id=1034&_format=json`
}
