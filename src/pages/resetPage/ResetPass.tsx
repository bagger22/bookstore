import { useState } from 'react';
import auth from '../authPage/auth.module.css';
import res from '../resetPage/reset.module.css';

export function ResetPass() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (email.trim() === '') {
      setMessage('Enter your email !');
      return;
    }

    setMessage(`You will receive an email ${email} with a link to reset your password!`);
  };

  return (
    <div className={auth.auth__container}>
      <div className={auth.form_container}>
        <form className={`${auth.auth__form} ${res.reset__form}`} onSubmit={handleResetClick}>
          <p className={res.auth__title}>Reset Password</p>
          {message && <p className={res.reset_message}>{message}</p>}
          
          <label htmlFor="email">Email</label>
          <input
            className={auth.auth__input}
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage('');
            }}
          />
          <button className={auth.confirm_reset_btn} type="submit">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
