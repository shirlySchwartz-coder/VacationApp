import axios from 'axios';
import React, { ChangeEvent, useState, useContext } from 'react';
import IUser from '../../Models/IUser';
import { ActionType } from '../../redux/action-type';
import { useDispatch } from "react-redux";

function Register() {
  let [firstname, setFirstName] = useState('');
  let [lastname, setLastName] = useState('');
  let [username, setUserName] = useState('');
  let [password, setPassword] = useState('');
  const dispatch = useDispatch();


  const OnInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let tempInfo = event.target.value;
    if (event.target.name === 'firstname') {
      setFirstName(tempInfo);
    }
    if (event.target.name === 'lastname') {
      setLastName(tempInfo);
    }
    if (event.target.name === 'username') {
      setUserName(tempInfo);
    }
    if (event.target.name === 'password') {
      setPassword(tempInfo);
    }
    console.log(event.target.name + ':' + tempInfo);
  };

  const validateData = () => {
    if (!firstname || firstname == null || firstname.length < 4) {
      console.error('Full name is requiered , and must be longer than 4');
    }
    if (!lastname || lastname == null || lastname.length < 4) {
      console.error('last name is requiered , and must be longer than 4');
    }
    if (!username || username == null || username.length < 4) {
      console.error('user name is requiered , and must be longer than 4');
    }
    if (!password || password == null || password.length < 4) {
      console.error('password is requiered , and must be longer than 4');
    } else {
      return false;
    }
  };
  const onRegisterClicked = () => {
    const afterValidaion = validateData();
    if (!afterValidaion) {
      throw new Error('Some thing not ok with the data;');
    } else {
      const user: IUser = {
        userId: null,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        userType: 'Custumer',
      };

      try {
        axios.post('http://localhost:3001/users/', user).then((response) => {
          console.log(response);
          if (response.status === 200) {
            dispatch({type:ActionType.AddNewUser, payload: user})
            console.log('User was Add');
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className='Register'>
      <div className='Register-Form'>
        <div className='Titel'>
          <h4>Register</h4>
        </div>
        <div className='Input-Container'>
          <label htmlFor='firstname' className='Label'>
            First Name:{' '}
          </label>
          <input
            type='text'
            name='firstname'
            placeholder='First Name'
            className='Input'
            value={firstname}
            onChange={OnInputChanged}
          />
        </div>
        <div className='Input-Container'>
          <label htmlFor='lastname' className='Label'>
            Last Name:{' '}
          </label>
          <input
            type='text'
            name='lastname'
            placeholder='Last Name'
            className='Input'
            value={lastname}
            onChange={OnInputChanged}
          />
        </div>
        <div className='Input-Container'>
          <label htmlFor='username' className='Label'>
            User Name:{' '}
          </label>
          <input
            type='text'
            name='username'
            placeholder='User Name'
            className='Input'
            value={username}
            onChange={OnInputChanged}
          />
        </div>
        <div className='Input-Container'>
          <label htmlFor='password' className='Label'>
            Password:{' '}
          </label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='Input'
            value={password}
            onChange={OnInputChanged}
          />
        </div>
      </div>
      <input
        type='button'
        className='Login-Btn'
        onClick={onRegisterClicked}
        value='Send'
      />
      <br />
      <div>
        Already have an account?{' '}
        <br />
      </div>
    </div>
  );
}
export default Register;


