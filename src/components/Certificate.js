import React from 'react';
import PropTypes from 'prop-types';

import './Certificate.css';

const Certificate = ({ cert, selectedCertificate, setSelectedCertificate }) => {
  return (
    <div className={`Certificate ${selectedCertificate === cert && 'selected'}`}>
      <div className="Certificate-body">
        <h3 className="Certificate-subtitle">{cert.NAME}</h3>
        <p className="Certificate-text">{cert.DESCRIPTION} {cert.PRICE}</p>
        {setSelectedCertificate && <button className="Certificate-card-btn" onClick={() => setSelectedCertificate(cert)} aria-label="Выбрать"></button>}
      </div>
    </div>
  );
};

Certificate.propTypes = {
  cert: PropTypes.object.isRequired,
  selectedCertificate: PropTypes.object,
  setSelectedCertificate: PropTypes.func,
};

export default Certificate;
