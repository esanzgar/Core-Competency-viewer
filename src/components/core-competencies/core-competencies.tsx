import React from 'react';

type Props = {
  domains: import('../../models/competency').Domain[];
};

export const CoreCompetencies = ({ domains }: Props) => {
  return (
    <>
      {domains.map(domain => (
        <p>{domain.title}</p>
      ))}
    </>
  );
};
