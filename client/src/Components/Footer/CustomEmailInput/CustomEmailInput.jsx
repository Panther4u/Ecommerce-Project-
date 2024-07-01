import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../../Shared/MiniComponents/SvgIcon';
import s from './CustomEmailInput.module.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomEmailInput = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const { t } = useTranslation();

  async function sendEmail(e) {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.post('http://localhost:8000/api/contact', { email });

      if (response.status === 200) {
        toast.success('Email sent successfully');
      } else {
        toast.error('Failed to send email');
      }
    } catch (error) {
      toast.error('Failed to send email');
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
    setEmail('');
  }

  return (
    <>
      <form className={s.input} onSubmit={sendEmail}>
        <input
          type="email"
          placeholder={t("inputsPlaceholders.enterYourEmail")}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" aria-label="Send mail" disabled={loading}>
          {loading ? (
            <div className={s.loader}></div>
          ) : (
            <SvgIcon name="vector" />
          )}
        </button>
      </form>
    </>
  );
};

export default CustomEmailInput;
