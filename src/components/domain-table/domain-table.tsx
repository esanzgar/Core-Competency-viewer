import React from 'react';

import Collapsible from 'react-collapsible';

import styles from './domain-table.module.css';

type Props = {
  domains: import('../../models/competency').CleanDomain[];
};

export const DomainTable = ({ domains }: Props) => (
  <>
    {domains.map(({ id, title, competencies }) => (
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
  </>
);
