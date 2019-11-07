import React, { useState, useEffect } from 'react';

import { TrainingResources } from '../training-resources/training-resources';
import { CoreCompetencies } from '../core-competencies/core-competencies';
import { SharedContent } from '../shared-content/shared-content';
import { ProgressBar } from '../progress-bar/progress-bar';

import { getTrainingResources } from '../../services/training/training';
import {
  getBioExcelDomains,
  getLatestBioExcelVersion
} from '../../services/competency/competency';

import styles from './root.module.css';

export const Root = () => {
  const [showKrc, setShowKrc] = useState(true);
  const [competencies, setCompetencies] = useState<
    import('../../models/competency').Domain[]
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
      const domains = await getBioExcelDomains(version);
      setCompetencies(domains);
    };

    Promise.all([fetchTraining(), fetchCompetencies()]);
  }, []);

  return (
    <>
      <header className="page-entry-header">
        <h1
          className={`page-entry-title entry-title ${styles.Tab} ${
            showKrc ? '' : styles.Inactive
          }`}
          onClick={() => setShowKrc(true)}
        >
          Knowledge Resource Center
        </h1>{' '}
        <h1
          className={`page-entry-title entry-title ${styles.Tab} ${
            showKrc ? styles.Inactive : ''
          }`}
          onClick={() => setShowKrc(false)}
        >
          Core Competencies
        </h1>
      </header>

      <div className="entry-content">
        <ProgressBar />

        {showKrc ? (
          <TrainingResources courses={courses} />
        ) : (
          <CoreCompetencies domains={competencies} />
        )}

        <SharedContent />
      </div>
    </>
  );
};
