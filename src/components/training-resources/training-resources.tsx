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
  const [keyword, setKeyword] = useState('');
  const [options, setOptions] = useState([] as string[]);
  const [topic, setTopic] = useState('');
  const [kindOptions, setKindOptions] = useState([] as string[]);
  const [kind, setKind] = useState('');

  function unique(words: string[]): string[] {
    // return [...new Set(words)];
    // return [...words.reduce((myMap, word) => myMap.set(word, null), new Map<string, null>()).keys()];
    return Object.keys(
      words.reduce(
        (uniqueWords, word) => ({ ...uniqueWords, [word]: null }),
        {} as Record<string, null>
      )
    );
  }

  useEffect(() => {
    setFilteredCourses(courses);
    const topics = courses.reduce(
      (keywords, course) =>
        course.keywords
          ? [...keywords, ...course.keywords.split(', ')]
          : keywords,
      [] as string[]
    );
    setOptions(['Topic', ...unique(topics)]);
    const kinds = courses.reduce(
      (keywords, course) => [...keywords, course.type],
      [] as string[]
    );
    setKindOptions(['Type', ...unique(kinds)]);
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

        <Select options={kindOptions} onChange={setKind} />
      </div>

      <TableCourses courses={filteredCourses} />
    </>
  );
};
