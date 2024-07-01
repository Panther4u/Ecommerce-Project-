import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import s from './ContactForm.module.scss';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const { t } = useTranslation();
  const [currentInput, setCurrentInput] = useState(0);
  const [inputErrors, setInputErrors] = useState([false, false, false, false]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const messageRef = useRef(null);

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, 3);
    inputsRef.current[0]?.focus();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput < 3) {
        if (validateInput(currentInput)) {
          inputsRef.current[currentInput + 1]?.focus();
          setCurrentInput((prev) => prev + 1);
        } else {
          toast.error('Please fill out all required fields.');
        }
      } else {
        formRef.current.submit();
      }
    }
  };

  const validateInput = (index) => {
    const value = index === 3 ? messageRef.current?.value : inputsRef.current[index]?.value;
    const isValid = value && value.trim() !== '';
    setInputErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = !isValid;
      return updatedErrors;
    });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      const response = await axios.post('http://localhost:8000/api/contact', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Message sent successfully');
      resetForm();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    formRef.current.reset();
    setCurrentInput(0);
    setInputErrors([false, false, false, false]);
    inputsRef.current[0]?.focus();
  };

  return (
    <form ref={formRef} className={s.contactForm} onSubmit={handleSubmit}>
      <div className={s.inputs}>
        <div className={s.wrapper}>
          <div className={s.input}>
            <input
              ref={(el) => (inputsRef.current[0] = el)}
              type="text"
              autoComplete="on"
              placeholder={t('inputsPlaceholders.yourName')}
              name="username"
              required
              onKeyPress={handleKeyPress}
              className={inputErrors[0] ? s.error : ''}
            />
            <span className={s.star} style={{ left: '103px' }} />
          </div>

          <div className={s.input}>
            <input
              ref={(el) => (inputsRef.current[1] = el)}
              type="email"
              autoComplete="on"
              placeholder={t('inputsPlaceholders.yourEmail')}
              name="email"
              required
              onKeyPress={handleKeyPress}
              className={inputErrors[1] ? s.error : ''}
            />
            <span className={s.star} style={{ left: '98px' }} />
          </div>

          <div className={s.input}>
            <input
              ref={(el) => (inputsRef.current[2] = el)}
              type="text"
              placeholder={t('inputsPlaceholders.yourPhone')}
              name="phone"
              required
              autoComplete="on"
              onKeyPress={handleKeyPress}
              className={inputErrors[2] ? s.error : ''}
            />
            <span className={s.star} style={{ left: '103px' }} />
          </div>
        </div>

        <textarea
          ref={messageRef}
          name="message"
          autoComplete="on"
          placeholder={t('inputsPlaceholders.yourMessage')}
          onKeyPress={handleKeyPress}
          className={inputErrors[3] ? s.error : ''}
        />
      </div>

      <div className={s.buttons}>
        <button type="reset">{t('common.reset')}</button>
        <button type="submit" disabled={loading}>
          {loading ? (
            <div className={s.loader}></div>
          ) : (
            t('buttons.sendMessage')
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
