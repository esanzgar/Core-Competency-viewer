import React, { useEffect, useState } from 'react';

import { withRouter, Link } from 'react-router-dom';
import { DomainTable } from '../domain-table/domain-table';
import parse from 'html-react-parser';
import { getTrainingResource } from '../../services/training/training';

type TrainingResource = import('../../models/training').TrainingResource;

export const Course = withRouter(({ match }) => {
  const [course, setCourse] = useState<TrainingResource | null>(null);
  const [domains, setDomains] = useState<
    import('../../models/competency').CleanDomain[]
  >([]);
  const [found, setFound] = useState(true);

  useEffect(() => {
    getTrainingResource(match.params.course)
      .then(({ courses, domains }) => {
        setDomains(domains);
        if (courses.length === 0) {
          setCourse(null);
          setFound(false);
        } else {
          setCourse(courses[0]);
          setFound(true);
        }
      })
      .catch(_ => setFound(false));
  }, [match.params.course]);

  if (!found) {
    return (
      <>
        <h2>
          <span className="fas exclamation-triangle"></span> Sorry, the
          requested training resource was not found!
        </h2>
        <Link to="/training">List of all training resources</Link>
      </>
    );
  }

  if (course === null) {
    return null;
  }

  if (course.archived === 'yes') {
    return (
      <>
        <h2>
          <span className="fas exclamation-triangle"></span> Sorry, the
          requested training resource has expired!
        </h2>
        <Link to="/training">List of all training resources</Link>
      </>
    );
  }

  const {
    title,
    description,
    target_audience,
    learning_outcomes,
    trainers,
    url
  } = course;
  return (
    <>
      <h1>{title}</h1>
      {parse(description)}

      {url && <a href={url}>External link to the training resource.</a>}

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

      {course.competency_profile.length > 0 && (
        <>
          <h2>Competency profile</h2>
          <DomainTable domains={domains} />
        </>
      )}

      <br />

      <Link to="/training">List of all training resources</Link>
    </>
  );
});
