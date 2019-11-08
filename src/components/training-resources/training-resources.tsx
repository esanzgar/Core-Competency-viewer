import React, { useState, useEffect } from 'react';

import styles from './training-resources.module.css';

type TrainingResource = import('../../models/training').TrainingResource;

type Props = {
  courses: TrainingResource[];
};

export const TrainingResources = ({ courses }: Props) => {
  // Added lowercase version of some properties for easy filtering
  const improveCourses = (courses: TrainingResource[]) =>
    courses.map(course => ({
      ...course,
      titleNoCase: course.title.toLowerCase(),
      typeNoCase: course.type.toLowerCase(),
      keywordsNoCase: course.keywords.toLowerCase()
    }));

  const [enhancedCourses, setEnhancedCourses] = useState(
    improveCourses(courses)
  );
  const [filteredCourses, setFilteredCourses] = useState(
    improveCourses(courses)
  );

  const onFilter = (keyword: string) => {
    const keywordNoCase = keyword.toLowerCase();
    setFilteredCourses(
      enhancedCourses.filter(
        course =>
          course.titleNoCase.includes(keywordNoCase) ||
          course.typeNoCase.includes(keywordNoCase) ||
          course.keywordsNoCase.includes(keywordNoCase)
      )
    );
  };

  useEffect(() => {
    const enhancedCourses = improveCourses(courses);
    setEnhancedCourses(enhancedCourses);
    setFilteredCourses(enhancedCourses);
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
            <th>Domain</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map(course => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.keywords}</td>
              <td>{course.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
