import React, { useEffect, useState } from 'react';

import Collapsible from 'react-collapsible';

import styles from './core-competencies.module.css';

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

      <form
        role="search"
        className={`search-form ${styles.FormLook}`}
        onSubmit={event => event.preventDefault()}
      >
        <input
          type="search"
          className="search-field"
          placeholder="Filter by keyword"
          onKeyUp={event => onFilter(event.currentTarget.value)}
        />
      </form>

      {filteredDomains.map(({ id, title, competencies }) => (
        <div key={id}>
          <div className={styles.Heading}>{title}</div>
          {competencies.map(({ id, title, attributes }) => (
            <Collapsible
              key={id}
              tabIndex={0.1}
              trigger={title}
              className={styles.Row}
            >
              {(['Knowledge', 'Skill', 'Attitude'] as (
                | 'Knowledge'
                | 'Skill'
                | 'Attitude')[]).map(kind =>
                attributes[kind].length < 1 ? null : (
                  <>
                    {kind}:
                    <ul>
                      {attributes[kind].map(attribute => (
                        <li>{attribute}</li>
                      ))}
                    </ul>
                  </>
                )
              )}
            </Collapsible>
          ))}
        </div>
      ))}

      {version !== '1.0' ? (
        <a href={`https://competency.ebi.ac.uk/framework/bioexcel/${version}`}>
          See previous versions of the BioExcel competency
        </a>
      ) : null}
    </>
  );
};
