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
  const [options, setOptions] = useState([] as string[]);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [keyword, setKeyword] = useState('');
  const [topic, setTopic] = useState('');
  const [kind, setKind] = useState('');

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

  useEffect(() => {
    setFilteredCourses(
      courses.filter(course => {
        const keywords = course.keywords || '';
        return (
          keywords.includes(topic) &&
          course.type.includes(kind) &&
          course.allNoCase.includes(keyword)
        );
      })
    );
  }, [keyword, topic, kind, courses]);

  return (
    <>
      <PrefaceTraining />

      <Filter onChange={setKeyword} />

      <div className={styles.LowerSpace}>
        <span className={styles.RightSpace}>Or filter by:</span>

        <Select
          options={options}
          className={styles.RightSpace}
          onChange={setTopic}
        />

        <Select
          options={['Type', 'Face-to-Face', 'Online']}
          onChange={setKind}
        />
      </div>

      <TableCourses courses={filteredCourses} />
    </>
  );
};
