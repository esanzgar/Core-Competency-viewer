import { http } from '../http/http';

type TrainingResources = import('../../models/training').TrainingResource[];

export async function getTrainingResources(): Promise<TrainingResources> {
  const response = await http.get<TrainingResources>('resources');
  const bioExcelTrainings = response.data.map(training => ({
    ...training,
    competency_profile: training.competency_profile.filter(
      competency => competency.framework_label === 'BioExcel'
    )
  }));

  return bioExcelTrainings.filter(
    training => training.competency_profile.length > 0
  );
}
