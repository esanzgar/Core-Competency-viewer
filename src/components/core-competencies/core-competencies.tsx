import React, { useEffect } from 'react';

type Props = {
  domains: import('../../models/competency').Domain[];
  version: string;
};

interface CleanCompetency {
  id: string;
  title: string;
  competencies: Competency[];
}

interface Competency {
  id: string;
  title: string;
  attributes: Attributes;
  allNoCase: string;
}

interface Attributes {
  Knowledge: string[];
  Skill: string[];
  Attitude: string[];
}

export const CoreCompetencies = ({ domains, version }: Props) => {
  useEffect(() => {
    const clean: CleanCompetency[] = [];
    domains.forEach(({ nid, title, competencies }) => {
      const cleanCompetency = competencies.map(competency => {
        const cleanAttributes = {
          Knowledge: [] as string[],
          Skill: [] as string[],
          Attitude: [] as string[]
        };
        const allNoCase: string[] = [];
        competency.attributes.forEach(
          ({ title, type, archived }) =>
            archived === '0' &&
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
      clean.push({ id: nid, title: title, competencies: cleanCompetency });
    });

    console.log(clean);
  }, [domains]);

  return (
    <>
      <p>
        The BioExcel training programme is based on a competency profile. A
        competency is an observable ability of any professional, integrating
        multiple components such as knowledge, skills and behaviours. A
        competency profile lists and defines all the competencies that an
        individual might need to fulfil a particular role, or that define
        specific user groups. Together with our user community we have defined
        the knowledge and skills that we think are relevant for people working
        in computational biomolecular research. In total we have defined 31
        competencies and they are grouped together in four large categories. You
        can browse them in the table below, under each competency there is a
        link to all the training resources that we have identified as relevant.
      </p>

      {domains.map(domain => (
        <>
          <p>{domain.title}</p>
          {domain.competencies.map(competency => (
            <>
              <p>{competency.title}</p>
              {competency.attributes.map(attribute => (
                <p>
                  {attribute.title}, {attribute.type}
                </p>
              ))}
            </>
          ))}
        </>
      ))}

      {version !== '1.0' ? (
        <a href={`https://competency.ebi.ac.uk/framework/bioexcel/${version}`}>
          See previous versions of the BioExcel competency
        </a>
      ) : null}
    </>
  );
};
