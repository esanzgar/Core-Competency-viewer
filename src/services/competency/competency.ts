import { http } from '../http/http';

export async function getLatestBioExcelVersion(): Promise<string> {
  const response = await http.get<
    import('../../models/competency').CompetencyVersion[]
  >('version_manager');
  const bioExcel = response.data.filter(
    competency => competency.title === 'BioExcel'
  )[0];
  const liveVersion = bioExcel.versions.filter(
    version => version.status === 'live'
  )[0];
  return liveVersion.number;
}

export async function getBioExcelDomains(
  version: string
): Promise<import('../../models/competency').Domain[]> {
  const response = await http.get<
    import('../../models/competency').Framework[]
  >(`bioexcel/${version}`);
  return response.data[0].domains;
}
