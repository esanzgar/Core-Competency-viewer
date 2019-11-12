import React from 'react';

import { Link } from 'react-router-dom';

type Props = {
  courses: import('../../models/training').TrainingResource[];
};

export const TableCourses = ({ courses }: Props) =>
  courses.length < 1 ? null : (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Topics</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(({ id, title, keywords, type }) => (
          <tr key={id}>
            <td>
              <Link to={`/training/${id}`}>{title}</Link>
            </td>
            <td>{keywords}</td>
            <td>{type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
