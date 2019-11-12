import React, { useEffect, useState } from 'react';

import { PrefaceTraining } from '../preface-training/preface-training';
import { Filter } from '../filter/filter';
import { TableCourses } from '../table-courses/table-courses';
import { Select } from '../select/select';

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
    setOptions(['Topic', ...Object.keys(uniqueKeywords)]);
  }, [courses]);

  return (
    <>
      <PrefaceTraining />

      <Filter onFilter={onFilter} />

      <div className={styles.LowerSpace}>
        <span className={styles.RightSpace}>Or filter by:</span>
        <Select
          options={options}
          className={styles.RightSpace}
          onChange={onFilter}
        />
        <Select
          options={['Type', 'Face-to-Face', 'Online']}
          onChange={onFilter}
        />
      </div>

      <TableCourses courses={filteredCourses} />
    </>
  );
};
