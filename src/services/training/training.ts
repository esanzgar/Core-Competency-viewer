import { http } from '../http/http';

type TrainingResources = import('../../models/training').TrainingResource[];

export async function getTrainingResources(): Promise<TrainingResources> {
  const response = await http.get<TrainingResources>('resources');

  return cleanup(response.data);
}

function cleanup(courses: TrainingResources): TrainingResources {
  const bioExcelTrainings = courses.map(course => ({
    ...course,
    competency_profile: course.competency_profile.filter(
      competency => competency.framework_label === 'BioExcel'
    ),

    // Added lowercase version of some properties for easy filtering
    allNoCase: `${course.title.toLowerCase()} ${course.type.toLowerCase()} ${course.keywords &&
      course.keywords.toLowerCase()}`
  }));

  return bioExcelTrainings.filter(
    course => course.archived === '0' && course.competency_profile.length > 0
  );
}
