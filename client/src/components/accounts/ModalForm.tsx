import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { setSourceMapRange } from 'typescript';
import Login from './Login';
import Register from './Register';
import './ModalForm.css';

function ModalForm() {
  const [show, setShow] = useState(false);
  const [on, setOn] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  const [goTo, setGoTo] = useState('Register');

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const changeLog = () => {
    console.log('before  showLogin :' + showLogin, 'goTo: ' + goTo, 'on: ' + on);
    if (showLogin) {
      setGoTo('Register');
    } else {
      setGoTo('Login');
    }
    let open= on;
    setOn(!open);
    setShowLogin(on);
    console.log('after  showLogin :' + showLogin, 'goTo: ' + goTo, 'on: ' + on);
    //on = !on;
  };
  return (
    <>
      <Button className='login-btn' variant='primary' onClick={handleShowModal}>
        Login
      </Button>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <h6 className='Title'>{showLogin ? 'Login' : 'Register'}</h6>
        </Modal.Header>
        <Modal.Body>
          <Form className='ModalForm'>
            {showLogin ? <Login /> : <Register />}

            <div>
              {showLogin ? 'Dont have an account?' : 'Already have an account?'}
              <input
                className='GoToBtn'
                type='button'
                value={goTo}
                onClick={changeLog}
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalForm;
