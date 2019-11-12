import React, { useEffect, useState } from 'react';

import { PrefaceCompetencies } from '../preface-competencies/preface-competencies';
import { Filter } from '../filter/filter';
import { DomainTable } from '../domain-table/domain-table';

type Props = {
  domains: import('../../models/competency').CleanDomain[];
  version: string;
};

export const CoreCompetencies = ({ domains, version }: Props) => {
  const [filteredDomains, setFilteredDomains] = useState(domains);

  const onFilter = (keyword: string) => {
    const keywordNoCase = keyword.toLowerCase();
    setFilteredDomains(
      domains
        .map(domain => ({
          ...domain,
          competencies: domain.competencies.filter(competency =>
            competency.allNoCase.includes(keywordNoCase)
          )
        }))
        .filter(domain => domain.competencies.length > 0)
    );
  };

  useEffect(() => {
    setFilteredDomains(domains);
  }, [domains]);

  return (
    <>
      <PrefaceCompetencies />

      <Filter onFilter={onFilter} />

      <DomainTable domains={filteredDomains} />

      {version !== '1.0' ? (
        <a href={`https://competency.ebi.ac.uk/framework/bioexcel/${version}`}>
          See previous versions of the BioExcel competency
        </a>
      ) : null}
    </>
  );
};
