import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './progress-bar.css';

export const ProgressBar = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Request
    const requestInterceptor = axios.interceptors.request.use(config => {
      setCounter(_counter => _counter + 1);
      return config;
    });

    // Response
    const onSuccess = (response: import('axios').AxiosResponse) => {
      setCounter(_counter => (_counter > 0 ? _counter - 1 : 0));
      return response;
    };
    const onError = (error: any) => {
      setCounter(_counter => (_counter > 0 ? _counter - 1 : 0));
      return Promise.reject(error);
    };
    const responseInterceptor = axios.interceptors.response.use(
      onSuccess,
      onError
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return (
    <section className="vf-inlay__content progressbar-slider">
      {counter ? (
        <>
          <div className="progressbar-line"></div>
          <div className="progressbar-progress progressbar-increase" />
          <div className="progressbar-progress progressbar-decrease" />
        </>
      ) : null}
    </section>
  );
};
