import React, { useState, useEffect } from 'react';

import { TrainingResources } from '../training-resources/training-resources';
import { CoreCompetencies } from '../core-competencies/core-competencies';
import { SharedContent } from '../shared-content/shared-content';

import { getTrainingResources } from '../../services/training/training';
import {
  getBioExcelDomains,
  getLatestBioExcelVersion
} from '../../services/competency/competency';

import styles from './root.module.css';

const fetchTraining = async () => await getTrainingResources();
const fetchCompetencies = async () => {
  const version = await getLatestBioExcelVersion();
  return await getBioExcelDomains(version);
};

export const Root = () => {
  const [showKrc, setShowKrc] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const [trainingResources, competencies] = await Promise.all([
        fetchTraining(),
        fetchCompetencies()
      ]);
      console.log(trainingResources, competencies);
    };

    fetchData();
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
        {showKrc ? <TrainingResources /> : <CoreCompetencies />}

        <SharedContent />
      </div>
    </>
  );
};
