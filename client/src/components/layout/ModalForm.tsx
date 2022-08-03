import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { setSourceMapRange } from 'typescript';
import Login from '../accounts/Login';
import Register from '../accounts/Register';

function ModalForm() {
  const [show, setShow] = useState(false);
  const [on, setOn] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  const [goTo, setGoTo] = useState('Register');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeLog = () => {
    console.log('before showLogin :' + showLogin, 'goTo: ' + goTo ,'on: ' + on) ;

    if (showLogin) {
      setGoTo('Login');
      setOn(!on)
    } else {
      setGoTo('Register');
      setOn(!on)
    }
    
    setShowLogin(on);
    console.log('after  showLogin :' + showLogin, 'goTo: ' + goTo , 'on: ' + on);
    //on = !on;
  };
  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            {showLogin ? <Login /> : <Register />}
            <div>
              <input type='button' value={goTo} onClick={changeLog} />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalForm;
