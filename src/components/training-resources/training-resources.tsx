import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import styles from './training-resources.module.css';

type TrainingResource = import('../../models/training').TrainingResource;

type Props = {
  courses: TrainingResource[];
};

export const TrainingResources = ({ courses }: Props) => {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [options, setOptions] = useState([] as string[]);

  const onFilter = (keyword: string) => {
    const keywordNoCase = keyword.trim().toLowerCase();
    setFilteredCourses(
      courses.filter(course => course.allNoCase.includes(keywordNoCase))
    );
  };

  useEffect(() => {
    setFilteredCourses(courses);
    const uniqueKeywords: Record<string, null> = {};
    courses.forEach(course => {
      if (course.keywords) {
        course.keywords
          .split(', ')
          .forEach(keyword => (uniqueKeywords[keyword] = null));
      }
    });
    setOptions(Object.keys(uniqueKeywords));
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

      <div className={styles.FormLook}>
        <span className={styles.RightSpace}>Or filter by:</span>
        <select
          onChange={event => onFilter(event.currentTarget.value)}
          className={styles.RightSpace}
        >
          <option value="">Topic</option>
          {options.map(value => (
            <option value={value.toLowerCase()}>{value}</option>
          ))}
        </select>

        <select onChange={event => onFilter(event.currentTarget.value)}>
          <option value="">Type</option>
          <option value="face-to-face">Face-to-Face</option>
          <option value="online">Online</option>
        </select>
      </div>

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
