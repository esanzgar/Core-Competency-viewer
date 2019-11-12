import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Header } from '../header/header';
import { ProgressBar } from '../progress-bar/progress-bar';
import { Course } from '../course/course';
import { TrainingResources } from '../training-resources/training-resources';
import { CoreCompetencies } from '../core-competencies/core-competencies';
import { SharedContent } from '../shared-content/shared-content';

import { getTrainingResources } from '../../services/training/training';
import {
  getBioExcelDomains,
  getLatestBioExcelVersion
} from '../../services/competency/competency';

export const Root = () => {
  const [version, setVersion] = useState('1.0');
  const [domains, setDomains] = useState<
    import('../../models/competency').CleanDomain[]
  >([]);
  const [courses, setCourses] = useState<
    import('../../models/training').TrainingResource[]
  >([]);

  useEffect(() => {
    const fetchTraining = async () => {
      const newCourses = await getTrainingResources();
      setCourses(newCourses.filter(course => course.archived === '0'));
    };

    const fetchCompetencies = async () => {
      const version = await getLatestBioExcelVersion();
      setVersion(version);
      const domains = await getBioExcelDomains(version);
      setDomains(domains);
    };

    Promise.all([fetchTraining(), fetchCompetencies()]);
  }, []);

  return (
    <>
      <Header />

      <div className="entry-content">
        <ProgressBar />

        <Switch>
          <Route
            path="/training/:course"
            render={() => <Course courses={courses} />}
          />
          <Route
            path="/training"
            render={() => <TrainingResources courses={courses} />}
          />
          <Route
            path="/competencies"
            render={() => (
              <CoreCompetencies version={version} domains={domains} />
            )}
          />
          <Redirect exact from="/" to="/training" />
          <Redirect to="/training" />
        </Switch>

        <SharedContent />
      </div>
    </>
  );
};
