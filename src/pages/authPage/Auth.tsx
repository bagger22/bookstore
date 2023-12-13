import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from './auth.module.css';

interface User {
  email: string;
  password: string;
}


interface SignUpFormProps {
  onSignUp: () => void;
  onSuccessfulRegistration: () => void;
}

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        onLogin();
        navigate('/account');
      } else {
        alert('Invalid email or password');
      }
    }
  };

  return (
    <form className={auth.auth__form} onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input
        className={auth.auth__input}
        type="email"
        name="email"
        id="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        className={auth.auth__input}
        type="password"
        name="password"
        id="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to="/reset" className={auth.forgot_password}>
        <p className={auth.forgot_password_text}>Forgot password?</p>
      </Link>
      <button className={auth.confirm_signin_btn} type="submit">
        Sign In
      </button>
    </form>
  );
};

interface SignUpFormProps {
  onSignUp: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onSuccessfulRegistration }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && confirmPassword === password) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      if (!users.find((user) => user.email === email)) {
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        onSignUp();
        onSuccessfulRegistration();
        navigate('/login'); 
      } else {
        alert('User with this email already exists');
      }
    } else {
      alert('Invalid registration data');
    }
  };
  return (
    <form className={auth.auth__form} onSubmit={handleSignUp}>
      <label htmlFor="email">Email</label>
      <input
        className={auth.auth__input}
        type="email"
        name="email"
        id="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        className={auth.auth__input}
        type="password"
        name="password"
        id="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        className={auth.auth__input}
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className={auth.confirm_signup_btn} type="submit">
        Sign Up
      </button>
    </form>
  );
};

interface AuthProps {
  isSignIn: boolean;
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthToggleButton: React.FC<AuthProps> = ({ isSignIn, setIsSignIn }) => {
  return (
    <div className={auth.auth__form_toggle}>
      <button
        className={`${auth.auth__btn} ${isSignIn ? auth.active : ''}`}
        onClick={() => setIsSignIn(true)}
      >
        Sign in
      </button>
      <button
        className={`${auth.auth__btn} ${!isSignIn ? auth.active : ''}`}
        onClick={() => setIsSignIn(false)}
      >
        Sign up
      </button>
    </div>
  );
};

export const Login: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (savedUsers.length > 0) {
      setLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/account');
  };

  const handleSignUp = () => {
    setIsSignIn(true);
  };

  const handleSuccessfulRegistration = () => {
    setIsSignIn(true);
  };

  if (isLoggedIn) {
    navigate('/account');
  }

  return (
    <div className={auth.auth__container}>
      <div className={auth.form_container}>
        <AuthToggleButton isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
        {isSignIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <SignUpForm onSignUp={handleSignUp} onSuccessfulRegistration={handleSuccessfulRegistration} />
        )}
      </div>
    </div>
  );
};