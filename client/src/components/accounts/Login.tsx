import axios from 'axios';
import { ConnectContext } from '../../services/socket-container';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  let connect = useContext(ConnectContext);

  const navigate = useNavigate();

  const validateLoginData = () => {
    if (!userName) {
      throw new Error('Empty user name');
    }

    if (!password) {
      throw new Error('Empty password');
    }

    if (password.length < 6) {
      throw new Error('Invalid password - too short');
    }
  };

  const onLoginClicked = async () => {
    try {
      validateLoginData();
      const response = await axios.post('http://localhost:3001/users/login', {
        userName,
        password,
      });
      const serverResponse = response.data;
      let token = 'Bearer ' + serverResponse.token;
      axios.defaults.headers.common['Authorization'] = token;
      localStorage.setItem('token', token);

      connect(token);
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className='Login'>
      <div className='Login-content'>
        <h4>Login</h4>
        <div className='Input-Container'>
          <label htmlFor='username' className='Label'>
            User Name:{' '}
          </label>
          <input
            type='text'
            placeholder='user name'
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className='Input-Container'>
          <label htmlFor='password' className='Label'>
            Password:{' '}
          </label>
          <input
            type='password'
            placeholder='password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <input
          type='button'
          value='Send'
          className='Login-Btn'
          onClick={onLoginClicked}
        />
        <div>Don't have an account? </div>
      </div>
    </div>
  );
}

export default Login;
