import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, provider } from '../Firebase';

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => {
      alert(err.message);
    });
  };

  return (
    <>
      <div className='login'>
        <div className='login__logo'>
          <img src='/iMessageLogo.png' alt='iMessage' />
          <h1>iMessage</h1>
        </div>
        <Button onClick={signIn}>Sign In</Button>
      </div>
    </>
  );
};

export default Login;
