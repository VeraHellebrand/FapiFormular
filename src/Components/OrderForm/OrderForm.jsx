// Komponenta OrderForm
import React, { useState } from 'react';

const OrderForm = ({ initialOrderDetails, onSubmitOrder }) => {
  const [formData, setFormData] = useState({
    firstName: initialOrderDetails?.firstName || '',
    lastName: initialOrderDetails?.lastName || '',
    email: initialOrderDetails?.email || '',
    street: initialOrderDetails?.street || '',
    streetNumber: initialOrderDetails?.streetNumber || '',
    city: initialOrderDetails?.city || '',
    zipCode: initialOrderDetails?.zipCode || '',
    phone: initialOrderDetails?.phone || ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    validateField(id, value);
  };

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'firstName':
        if (value.trim() === '') error = 'Jméno je povinné';
        break;
      case 'lastName':
        if (value.trim() === '') error = 'Příjmení je povinné';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) error = 'Zadejte platný email';
        break;
      case 'street':
        if (value.trim() === '') error = 'Ulice je povinná';
        break;
      case 'streetNumber':
        if (value.trim() === '') error = 'Číslo popisné je povinné';
        break;
      case 'city':
        if (value.trim() === '') error = 'Město je povinné';
        break;
      case 'zipCode':
        const zipCodeRegex = /^\d{5}$/;
        if (!zipCodeRegex.test(value.trim())) error = 'Zadejte platné PSČ';
        break;
      case 'phone':
        const phoneRegex = /^\+[1-9]{1}[0-9]{7,14}$/;
        if (!phoneRegex.test(value.trim())) error = 'Zadejte platné telefonní číslo ve formátu +420123456789';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${field}Error`]: error
    }));

    return error === '';
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((field) => {
      const fieldIsValid = validateField(field, formData[field]);
      if (!fieldIsValid) isValid = false;
    });
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmitOrder(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <div className="mb-2">
            <label htmlFor="firstName" className="form-label">Jméno</label>
            <input
              type="text"
              className={`form-control ${errors.firstNameError && 'is-invalid'}`}
              id="firstName"
              placeholder="Jan"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">{errors.firstNameError}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="lastName" className="form-label">Příjmení</label>
            <input
              type="text"
              className={`form-control ${errors.lastNameError && 'is-invalid'}`}
              id="lastName"
              placeholder="Hravý"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">{errors.lastNameError}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.emailError && 'is-invalid'}`}
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">{errors.emailError}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="phone" className="form-label">Telefon</label>
            <input
              type="text"
              className={`form-control ${errors.phoneError && 'is-invalid'}`}
              id="phone"
              placeholder="+420 123 456 789"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">{errors.phoneError}</div>
          </div>
        </div>
        <div className="col">
          <div className="mb-2">
            <label htmlFor="street" className="form-label">Ulice</label>
            <input
              type="text"
              className={`form-control ${errors.streetError && 'is-invalid'}`}
              id="street"
              placeholder="Ulice"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">{errors.streetError}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="streetNumber" className="form-label">Číslo popisné</label>
            <input
              type="text"
              className={`form-control ${errors.streetNumberError && 'is-invalid'}`}
              id="streetNumber"
              placeholder="123"
              value={formData.streetNumber}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">{errors.streetNumberError}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="city" className="form-label">Město</label>
            <input
              type="text"
              className={`form-control ${errors.cityError && 'is-invalid'}`}
              id="city"
              placeholder="Město"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">{errors.cityError}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="zipCode" className="form-label">PSČ</label>
            <input
              type="text"
              className={`form-control ${errors.zipCodeError && 'is-invalid'}`}
              id="zipCode"
              placeholder="PSČ"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
            <div className="invalid-feedback">{errors.zipCodeError}</div>
          </div>
          <button type="submit" className="btn btn-secondary">Kontrola objednávky</button>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
