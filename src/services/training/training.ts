import { http } from '../http/http';

import { cleanupDomain } from '../competency/competency';

type TrainingResource = import('../../models/training').TrainingResource;

export async function getTrainingResources(): Promise<TrainingResource[]> {
  const response = await http.get<TrainingResource[]>('resources');

  return cleanupTraining(response.data);
}

export async function getTrainingResource(
  code: string
): Promise<{
  courses: TrainingResource[];
  domains: ReturnType<typeof cleanupDomain>;
}> {
  const response = await http.get<TrainingResource>('resources', {
    params: { id: code }
  });
  const courses = cleanupTraining([response.data]);
  const domains =
    courses.length > 0 && courses[0].competency_profile.length > 0
      ? cleanupDomain(courses[0].competency_profile[0].domains || [])
      : [];
  return { courses, domains };
}

function cleanupTraining(courses: TrainingResource[]): TrainingResource[] {
  const bioExcelTrainings = courses.map(course => ({
    ...course,
    competency_profile: course.competency_profile.filter(competency =>
      [competency.framework_label, competency.title].includes('BioExcel')
    ),

    // Added lowercase version of some properties for easy filtering
    allNoCase: `${course.title.toLowerCase()} ${course.type.toLowerCase()} ${course.keywords &&
      course.keywords.toLowerCase()}`
  }));

  return bioExcelTrainings.filter(
    course => course.archived === 'no' && course.competency_profile.length > 0
  );
}
