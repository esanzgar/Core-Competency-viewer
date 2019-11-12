import React from 'react';

type Props = {
  options: string[];
  onChange(value: string): void;
  className?: string;
};

export const Select = ({ options, onChange, className }: Props) => (
  <select
    onChange={event => onChange(event.currentTarget.value)}
    className={className}
  >
    {options.map((value, index) => (
      <option value={index === 0 ? '' : value.toLowerCase()}>{value}</option>
    ))}
  </select>
);
