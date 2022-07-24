import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

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

      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className='Login'>
      <div className='Login-content'>
        <h4>Login</h4>
        <input
          type='text'
          placeholder='user name'
          onChange={(event) => setUserName(event.target.value)}
        />
        <br />
        <input
          type='password'
          placeholder='password'
          onChange={(event) => setPassword(event.target.value)}
        />

        <div>Forget your password?</div>
        <br />
        <input
          type='button'
          value='Login'
          className='Login-Btn'
          onClick={onLoginClicked}
        />
       
        <br />
        <div>Don't have an account? </div>
      </div>
    </div>
  );
}

export default Login;
