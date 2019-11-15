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

type CleanDomain = import('../../models/competency').CleanDomain;

export async function getBioExcelDomains(
  version: string
): Promise<CleanDomain[]> {
  const response = await http.get<
    import('../../models/competency').Framework[]
  >(`bioexcel/${version}`);
  return response.data.length === 0
    ? []
    : cleanupDomain(response.data[0].domains);
}

export function cleanupDomain(
  domains: import('../../models/competency').Domain[]
): CleanDomain[] {
  const clean: CleanDomain[] = [];

  domains.forEach(({ nid, id, title, competencies }, index) => {
    const cleanCompetency = competencies
      .filter(competency => competency.archived === 'no')
      .map(competency => {
        const cleanAttributes = {
          Knowledge: [] as string[],
          Skill: [] as string[],
          Attitude: [] as string[]
        };
        const allNoCase: string[] = [];
        // competency.archived;
        competency.attributes.forEach(
          ({ title, type, archived }) =>
            archived === 'no' &&
            cleanAttributes[type].push(title) &&
            allNoCase.push(title.toLowerCase())
        );
        allNoCase.push(competency.title.toLowerCase());
        return {
          id: competency.id,
          title: competency.title,
          attributes: cleanAttributes,
          allNoCase: allNoCase.join('\n')
        };
      });
    clean.push({
      id: nid || id || '' + index,
      title: title,
      competencies: cleanCompetency
    });
  });

  return clean;
}
