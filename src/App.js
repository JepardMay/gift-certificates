import React, { useState } from 'react';
import Loader from './components/Loader';
import Certificates from './components/Certificates';
import ContactForm from './components/ContactForm';

import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedCert, setSelectedCert] = useState(null);

  const handleSelectCert = (cert) => {
    setSelectedCert(cert);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFormSubmit = () => {
    setLoading(true);
    setStep(3);
  };

  return (
    <div className="App">
      <div className="App-img">
        <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="600" alt="Gift" />
      </div>
      {loading && <Loader />}
      <div className="App-container">
        {step === 1 && <Certificates onSelect={handleSelectCert} setLoading={setLoading} />}
        {step === 2 && <ContactForm selectedCert={selectedCert} onBack={handleBack} onSubmit={handleFormSubmit} setLoading={setLoading} />}
        {step === 3 && <div className="App-block">Оплата...</div>}
      </div>
    </div>
  );
};

export default App;
