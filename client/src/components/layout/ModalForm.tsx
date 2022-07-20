import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Login/Register';

function ModalForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showLogin, setShowLogin] = useState(false);
  const [hideModal, setHideModal] = useState(false);

  const changeLogin = () => {
    setShowLogin(true);
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Register />
            <span>Alreardy registered?</span>
            <br />
            <button type='button' onClick={() => changeLogin()}>
              Login
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalForm;
