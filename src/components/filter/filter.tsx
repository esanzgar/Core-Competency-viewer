import React from 'react';

import styles from './filter.module.css';

type Props = {
  onFilter(keyword: string): void;
};

export const Filter = ({ onFilter }: Props) => (
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
);
