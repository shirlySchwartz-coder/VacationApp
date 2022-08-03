import React from 'react';
import './App.css';
import Layout from '../components/layout/Layout';
//import Modal from './components/layout/ModalForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import SocketContainer from '../services/socket-container';

function App() {
  return (
    <div className='App'>
      <SocketContainer>
        <Layout />
      </SocketContainer>
    </div>
  );
}

export default App;
