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
  keywords?: any;
  archived: string;
  author: string;
  competency_profile: Competencyprofile[];
  allNoCase: string; // To facilitate the search
}

interface Competencyprofile {
  framework_id: string;
  framework_uuid: string;
  framework_label: string;
  domain_id: string;
  domain_uuid: string;
  domain_label: string;
  competency_id: string;
  competency_uuid: string;
  competency_label: string;
  attribute_id: string;
  attribute_uuid: string;
  attribute_label: string;
  attribute_type: string;
}
