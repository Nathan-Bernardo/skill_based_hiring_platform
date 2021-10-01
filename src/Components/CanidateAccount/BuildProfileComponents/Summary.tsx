import React from 'react';
import Webcam from '@uppy/webcam';
import Tus from '@uppy/tus';
import { useForm } from '../../../hooks';

export const Summary = (): JSX.Element => {
  return (
    <>
      <div className="summary-container">
        <div className="summary-content">
          <div className="contact-summary-text">Contact Sumary</div>
          <input className="summary-name-field" type="text" required placeholder="Name..." />
          <input className="summary-email-field" type="text" required placeholder="Email..." />
          <input className="summary-phone-field" type="text" required placeholder="Phone..." />
          <input className="location-field" type="text" required placeholder="Location..." />
          <input className="linkedin-field" type="text" required placeholder="Linkedin..." />
        </div>
        <div className="experience-summary-container">
          <div className="experience-summary-text"> Experience Summary</div>
        </div>
      </div>
    </>
  );
};
