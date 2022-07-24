import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { setSourceMapRange } from 'typescript';
import Login from '../accounts/Login';
import Register from '../accounts/Register';

function ModalForm() {
  const [show, setShow] = useState(false);
  let on = true;
  const [showLogin, setShowLogin] = useState(false);
  /*const [showRegister, setShowRegister] = useState(true);*/
  const [goTo, setGoTo] = useState('Login');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeLog = () => {
   
    console.log(
      'before showLogin :' + showLogin,
      'goTo: ' + goTo);
    if (!showLogin) {
      setShowLogin(on);
      setGoTo('Register');
    } else {
      setShowLogin(!on);
      setGoTo('Login');
    }
  };
  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            {showLogin ? <Login /> : <Register />}
            <input type='button' value={goTo} onClick={changeLog} />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalForm;
