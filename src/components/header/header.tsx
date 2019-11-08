import React from 'react';

import { withRouter } from 'react-router-dom';

import styles from './header.module.css';

export const Header = withRouter(({ location, history }) => {
  const showKrc = location.pathname.startsWith('/training');

  return (
    <header className="page-entry-header">
      <h1
        className={`page-entry-title entry-title ${styles.Tab} ${
          showKrc ? '' : styles.Inactive
        }`}
        onClick={() => history.push('/training')}
      >
        Knowledge Resource Center
      </h1>{' '}
      <h1
        className={`page-entry-title entry-title ${styles.Tab} ${
          showKrc ? styles.Inactive : ''
        }`}
        onClick={() => history.push('/competencies')}
      >
        Core Competencies
      </h1>
    </header>
  );
});
