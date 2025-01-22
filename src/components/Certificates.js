import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Certificate from './Certificate';

import './Certificates.css';

const Certificates = ({ onSelect, setLoading }) => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);


  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);

      try {
        const response = await axios.post('https://sycret.ru/service/api/api', {
          ApiKey: '011ba11bdcad4fa396660c2ec447ef14',
          MethodName: 'OSGetGoodList'
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = response.data;

        if (data.result === 0) {
          setCertificates(data.data);
        } else {
          throw new Error(data.resultdescription);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="Certificates">
      <h2 className="Certificates-title">Выберите подарочный сертификат</h2>
      <div className="Certificates-list">
        {certificates.map(cert => (
          <Certificate key={cert.Id} cert={cert} selectedCertificate={selectedCertificate} setSelectedCertificate={setSelectedCertificate} />
        ))}
      </div>
      {selectedCertificate && <button className="Certificates-btn" onClick={() => onSelect(selectedCertificate)}>Купить</button>}
    </div>
  );
};

Certificates.propTypes = {
  onSelect: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Certificates;
