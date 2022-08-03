import React from 'react';

function Foooter() {
  function contactUs() {
    console.log('Open Contact Me');
    alert('Open Contact Me');
  }
  return (
    <div className='Footer'>
      <div>Created By @ShirlyComp</div>

      <input type='button' onClick={contactUs} value='Contect Us' />
    </div>
  );
}

export default Foooter;
