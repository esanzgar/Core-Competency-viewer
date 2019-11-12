import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import styles from './training-resources.module.css';

type TrainingResource = import('../../models/training').TrainingResource;

type Props = {
  courses: TrainingResource[];
};

export const TrainingResources = ({ courses }: Props) => {
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const onFilter = (keyword: string) => {
    const keywordNoCase = keyword.toLowerCase();
    setFilteredCourses(
      courses.filter(course => course.allNoCase.includes(keywordNoCase))
    );
  };

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  return (
    <>
      <p>
        The BioExcel knowledge resource center is a repository for computational
        biomolecular training resources aggregated from BioExcel partners and
        third party providers. The resources are primarily online based, such as
        tutorials, online courses and videos but also include face-to-face
        event. If you know of any useful resources that you would like to share
        with the community let us know through this online{' '}
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfY-GI9sGuhRtMlIJJ1zVZtvD8peM3UnzemjSokUK3yAk0Xtw/viewform?c=0&w=1">
          form
        </a>
        . The training resources in the Knowledge Resource Center have been
        tagged with the BioExcel competencies.
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
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Topics</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map(({ id, title, keywords, type }) => (
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
    </>
  );
};
