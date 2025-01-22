import React, { useState } from 'react';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import Certificate from './Certificate';

import './ContactForm.css';

const ContactForm = ({ selectedCert, onBack, onSubmit, setLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Имя обязательно для заполнения';
    if (!formData.phone) newErrors.phone = 'Телефон обязателен для заполнения';
    if (!formData.email) newErrors.email = 'Почта обязательна для заполнения';
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://sycret.ru/service/api/api', {
        ApiKey: '011ba11bdcad4fa396660c2ec447ef14',
        MethodName: 'OSSale',
        Id: selectedCert.Id,
        TableName: selectedCert.TableName,
        PrimaryKey: selectedCert.PrimaryKey,
        Price: selectedCert.Price,
        Summa: selectedCert.Summa,
        ClientName: formData.name,
        Phone: formData.phone.replace(/\D/g, ''),
        Email: formData.email,
        PaymentTypeId: 2,
        UseDelivery: 0,
        IsGift: 0,
        MsgText: '',
        PName: formData.name,
        PPhone: formData.phone.replace(/\D/g, '')
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;

      if (data.result === 0) {
        console.log('Success:', data);
        onSubmit();
      } else {
        console.error('Server Error:', data.resultdescription);
        console.error('Full Response:', data);
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ContactForm">
      <div className="ContactForm-cert">
        <Certificate cert={selectedCert} />
      </div>
      <div className="ContactForm-body">
        <div className={`ContactForm-input ${errors.name ? 'error' : ''}`}>
          <label htmlFor="name">ФИО *</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className={`ContactForm-input ${errors.phone ? 'error' : ''}`}>
          <label htmlFor="phone">Телефон *</label>
          <MaskedInput
            mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            value={formData.phone}
            type="tel"
            name="phone"
            id="phone"
            placeholder="Ваш телефон"
            onChange={handleChange}
            required
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        <div className={`ContactForm-input ${errors.email ? 'error' : ''}`}>
          <label htmlFor="email">Почта *</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Ваша почта"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="ContactForm-input">
          <label htmlFor="message">Сообщение</label>
          <textarea name="message" id="message" placeholder="Сообщение"></textarea>
        </div>
        <div className="ContactForm-footer">
          <button className="ContactForm-btn" onClick={onBack}>Назад</button>
          <button className="ContactForm-btn" onClick={handleSubmit}>Оплатить</button>
        </div>
      </div>
    </div>
  );
};

ContactForm.propTypes = {
  selectedCert: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default ContactForm;
