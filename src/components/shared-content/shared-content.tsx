import React from 'react';

export const SharedContent = () => {
  return (
    <>
      <div className="sharedaddy sd-sharing-enabled">
        <div className="robots-nocontent sd-block sd-social sd-social-icon-text sd-sharing">
          <h3 className="sd-title">Share this:</h3>
          <div className="sd-content">
            <ul>
              <li className="share-linkedin">
                <a
                  rel="nofollow noopener noreferrer"
                  data-shared="sharing-linkedin-3249"
                  className="share-linkedin sd-button share-icon"
                  href="https://bioexcel.eu/equality-and-diversity/?share=linkedin"
                  target="_blank"
                  title="Click to share on LinkedIn"
                >
                  <span>LinkedIn</span>
                </a>
              </li>
              <li className="share-twitter">
                <a
                  rel="nofollow noopener noreferrer"
                  data-shared="sharing-twitter-3249"
                  className="share-twitter sd-button share-icon"
                  href="https://bioexcel.eu/equality-and-diversity/?share=twitter"
                  target="_blank"
                  title="Click to share on Twitter"
                >
                  <span>Twitter</span>
                </a>
              </li>
              <li className="share-print">
                <a
                  rel="nofollow noopener noreferrer"
                  data-shared=""
                  className="share-print sd-button share-icon"
                  href="https://bioexcel.eu/equality-and-diversity/#print"
                  target="_blank"
                  title="Click to print"
                >
                  <span>Print</span>
                </a>
              </li>
              <li className="share-end"></li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="sharedaddy sd-block sd-like jetpack-likes-widget-wrapper jetpack-likes-widget-unloaded"
        id="like-post-wrapper-104095998-3249-5d12135808442"
        data-src="https://widgets.wp.com/likes/#blog_id=104095998&amp;post_id=3249&amp;origin=bioexcel.eu&amp;obj_id=104095998-3249-5d12135808442"
        data-name="like-post-frame-104095998-3249-5d12135808442"
      >
        <h3 className="sd-title">Like this:</h3>
        <div
          className="likes-widget-placeholder post-likes-widget-placeholder"
          style={{ height: '55px' }}
        >
          <span className="button">
            <span>Like</span>
          </span>
          <span className="loading">Loading...</span>
        </div>
        <span className="sd-text-color"></span>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
        <a className="sd-link-color"></a>
      </div>
    </>
  );
};
