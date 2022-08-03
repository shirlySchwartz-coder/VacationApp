
import axios from 'axios';
import React, { ChangeEvent, useState, useContext } from 'react';
import { ActionType } from '../../redux/action-type';
import './AddVacation.css';
import IVacation from '../../Models/IVacation';
import { useDispatch } from "react-redux";


function AddVacation() {
  let start = '';
  let end = '';
  let today = new Date();
  console.log(today);
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();


  // const addVacationValidation = () => {

  //   if (!destination || !price || !startDate || !endDate || !description) {
  //     alert('PLEASE FILL ALL THE ABOVE');
  //     return false;
  //   }
  //   // if (start_date.getTime() > today.getTime()) {
  //   //     console.log("date HAS passed");

  //   // }

  //   //let end = endDate
  //   //const [month, day, year] = start.split('-');
  //   //let date = new Date(+year, +month-1, +day)
  //   //setStartDate(date)
  //   console.log(start, end, startDate);

  //   const newVacation = {
  //     destination: destination,
  //     price: price,
  //     startDate: start,
  //     endDate: end,
  //     imageUrl: imageUrl,
  //     description: description,
  //   };
  // };

  const validateData = () => {
    if (!destination || destination == null || destination.length < 2) {
      console.error('Destination is requiered , and must be longer than 2');
    }
    if (!price || price == null || price <= 0) {
      console.error('Price is requiered , and must be bigger than 0');
    }
    if (!startDate || startDate == null || startDate < today) {
      console.error('Start Date is requiered , and must be longer than 4');
    }
    if (!endDate || endDate == null || endDate > today) {
      console.error(
        'End Date is requiered , and must be bigger or equel then today'
      );
    } else {
      return false;
    }
  };
  const onSendClicked = () => {
    const afterValidaion = validateData();
    if (!afterValidaion) {
      throw new Error('Some thing not ok with the data;');
    } else {
      const newVacation = {
        destination: destination,
        price: price,
        startDate: start,
        endDate: end,
        imageUrl: imageUrl,
        description: description,
      };

      try {
        axios
          .post('http://localhost:3001/vacations/', newVacation)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              dispatch({ type: ActionType.AddVacation, payload: newVacation });
              console.log('User was Add');
            }
          });
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className='add-card card'>
      <div className='Titel'>
        <h4>Add Vacation</h4>
      </div>
      <div className='Input-Container row justify-content-center'>
        <label htmlFor='destination' className='Label col-5'>
          Destination:{' '}
        </label>
        <input
          type='text'
          name='destination'
          placeholder='Destination'
          className='Input col-6'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className='Input-Container row justify-content-center'>
        <label htmlFor='price' className='Label col-5'>
          Price:{' '}
        </label>
        <input
          type='number'
          name='price'
          placeholder='Price'
          className='Input col-6'
          value={price}
          defaultValue={null}
          onChange={(e) => setPrice(+e.target.value)}
        />
      </div>
      <div className='Input-Container row justify-content-center'>
        <label htmlFor='startDate' className='Label col-5'>
          Start Date:{' '}
        </label>
        <input
          type='date'
          name='startDate'
          placeholder='Start Date'
          className='Input col-6'
          value={start}
          onChange={(e) => (start = e.target.value)}
        />
      </div>
      <div className='Input-Container row justify-content-center'>
        <label htmlFor='endDate' className='Label col-5'>
          End Date:{' '}
        </label>
        <input
          type='date'
          name='endDate'
          placeholder='End Date'
          className='Input col-6'
          value={end}
          onChange={(e) => (end = e.target.value)}
        />
      </div>
      <div className='Input-Container row justify-content-center'>
        <label htmlFor='imageUrl' className='Label col-5'>
          Image Url:{' '}
        </label>
        <textarea
          name='imageUrl'
          placeholder='Image Url'
          className='Input col-6'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div className='Input-Container row justify-content-center'>
        <label htmlFor='description' className='Label col-5'>
          Description:{' '}
        </label>
        <textarea
          name='description'
          placeholder='Description'
          className='Input col-6'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <br />
      <div className='Send-Button'>
        <input
          type='button'
          className='Add-Btn'
          onClick={onSendClicked}
          value='Add Vacation'
        />
      </div>
    </div>
  );
}

export default AddVacation;
