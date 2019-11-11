import React, { useEffect, useState } from 'react';

import { withRouter, Link } from 'react-router-dom';
import parse from 'html-react-parser';

type TrainingResource = import('../../models/training').TrainingResource;
type Props = {
  courses: TrainingResource[];
} & import('react-router-dom').RouteComponentProps;

export const Course = withRouter(({ match, courses }: Props) => {
  const [course, setCourse] = useState<TrainingResource | null>(null);
  const [found, setFound] = useState(true);

  useEffect(() => {
    if (courses.length > 0) {
      const courseId = (match.params as Record<string, string>)['course'];
      const matchingCourses = courses.filter(course => course.id === courseId);
      if (matchingCourses.length > 0) {
        setFound(true);
        setCourse(matchingCourses[0]);
      } else {
        setFound(false);
        setCourse(null);
      }
    }
  }, [match, courses]);

  if (!found) {
    return (
      <>
        <p>Sorry, the requested training resource was not found!</p>
        <Link to="/training">List of all training resources</Link>
      </>
    );
  }

  if (course === null) {
    return null;
  }
  const {
    title,
    description,
    target_audience,
    learning_outcomes,
    trainers
  } = course;
  return (
    <>
      <h1>{title}</h1>
      {parse(description)}

      {target_audience && (
        <>
          <h2>Target Audience</h2>
          {parse(target_audience)}
        </>
      )}

      {learning_outcomes && (
        <>
          <h2>Learning Outcomes</h2>
          {parse(learning_outcomes)}
        </>
      )}

      {trainers && (
        <>
          <h2>Trainers</h2>
          {parse(trainers)}
        </>
      )}
      <Link to="/training">List of all training resources</Link>
    </>
  );
});
