import React from 'react';
import ModalForm from '../accounts/ModalForm';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu() {
  return (
    <Navbar className='menu-bar' bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='/'>Vacations App</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='menu-item' href='/'>Home</Nav.Link>
            <Nav.Link href='/about'>About</Nav.Link>
            <NavDropdown title='Search Trip ' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='#action3'>
                By Destination
              </NavDropdown.Item>
              <NavDropdown.Item href='#action4'>By Price</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#' disabled>
              {' '}
              Data analysis
            </Nav.Link>

            <Nav>
              <Form className='d-inline-flex p-2'>
                <Form.Control
                  type='search'
                  placeholder='Search'
                  className='me-2'
                  aria-label='Search'
                />
                <Button variant='outline-success' className='me-2'>
                  Search
                </Button>
              </Form>
            </Nav>
            <Nav>
              <ModalForm />
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
