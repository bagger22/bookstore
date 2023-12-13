import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import account from '../account/account.module.css';

export const Account: React.FC = () => {
  const navigate = useNavigate();

  const [isLoggedIn] = useState(true);

  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveChanges = () => {

    setSavedMessage('Settings saved');

    if (!newEmail) {
        setEmailError('Email is required');
        return;
      } else {
        setEmailError(null);
      }
  
      // Проверка корректности email
      if (!isValidEmail(newEmail)) {
        setEmailError('Invalid email format');
        return;
      } else {
        setEmailError(null);
      }

    // Очистить поля ввода
    setName('');
    setNewEmail('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');

    setTimeout(() => setSavedMessage(null), 3000);

  };

  const handleLogout = () => {
    localStorage.removeItem('users');
    
    navigate('/login');
  };
  
  return (
    <div className={account.account__container}>
      <div className={account.account__wrapper}>
        <svg
          className={account.account__arrow}
          onClick={() => navigate('/')}
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="24"
          viewBox="0 0 45 24"
          fill="none"
        >
          <rect width="24" height="24" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.0014 5.99897C11.0014 6.25897 10.9014 6.50897 10.7114 6.70897L6.41141 10.999L44.0014 10.999C44.5514 10.999 45.0014 11.449 45.0014 11.999C45.0014 12.549 44.5514 12.999 44.0014 12.999L6.41141 12.999L10.7114 17.289C11.1014 17.679 11.1014 18.319 10.7114 18.709C10.3214 19.099 9.68141 19.099 9.29141 18.709L3.29141 12.709C3.20141 12.619 3.13141 12.509 3.08141 12.389C3.06141 12.339 3.04141 12.299 3.04141 12.249C2.99141 12.089 2.99141 11.909 3.04141 11.749C3.04141 11.699 3.06141 11.659 3.08141 11.609C3.13141 11.489 3.20141 11.379 3.29141 11.289L9.29141 5.28897C9.68141 4.89896 10.3214 4.89896 10.7114 5.28897C10.9014 5.48897 11.0014 5.73897 11.0014 5.99897Z"
            fill="#313037"
          />
        </svg>
        <h3 className={account.account__title}>Account</h3>
        {!emailError && savedMessage && <p className={account.account__saved_message}>{savedMessage}</p>}
        <p className={account.account__text}>profile</p>
        <div className={account.account__profile_wrapper}>
          <fieldset className={account.account__fieldset}>
            <legend className={account.account__label}>Name</legend>
            <input
              className={account.account__input}
              type="text"
              name="text"
              id="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>
          <fieldset className={account.account__fieldset}>
          <legend className={account.account__email_label}>Email</legend>
          <input
            className={account.account__email_input}
            type="email"
            name="email"
            id="email"
            placeholder="Your new email"
            required  // Обязательное поле
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          {emailError && <p className={account.account__error_message}>{emailError}</p>}
        </fieldset>
        </div>

        <p className={account.account__text}>password</p>
        <div className={account.account__password_wrapper}>
          <fieldset className={account.account__fieldset}>
            <legend className={account.account__label}>Password</legend>
            <input
              className={account.account__input}
              type="password"
              name="password"
              id="password"
              placeholder="Your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </fieldset>
          <fieldset className={account.account__fieldset}>
            <legend className={account.account__newpass_label}>New password</legend>
            <input
              className={account.account__newpass_input}
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </fieldset>
          <fieldset className={account.account__fieldset}>
            <legend className={account.account__label}>Confirm new password</legend>
            <input
              className={account.account__input}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </fieldset>
        </div>
        <p className={account.account__bottom_line} />
        <div className={account.account__btn_wrapper}>
          <button
            type="submit"
            onClick={() => {
              handleSaveChanges();
            }}
            className={account.account__save_btn}
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={() => {
              setName('');
              setNewEmail('');
              setCurrentPassword('');
              setNewPassword('');
              setConfirmNewPassword('');
              navigate('/');
            }}
            className={account.account__cancel_btn}
          >
            Cancel
          </button>
          {isLoggedIn && (
          <button onClick={handleLogout} className={account.account__logout_btn}>
            Logout
          </button>
        )}
        </div>
      </div>
    </div>
  );
};
