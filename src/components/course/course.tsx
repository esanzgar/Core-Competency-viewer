import React from 'react';

import { withRouter } from 'react-router-dom';

export const Course = withRouter(location => {
  const course = location.match.params.course;

  return <p>course: {course}</p>;
});
