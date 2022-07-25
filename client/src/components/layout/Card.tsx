import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IVacation from '../../Models/IVacation';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import './Card.css';

export interface IVacationCard {
  vacation: IVacation;
}

function Card(props: IVacationCard) {
  const { vacation } = props;
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [img, setImg] = useState('');

  const nlBEFormatter = new Intl.DateTimeFormat('nl-BE');

  const intialDate = (unformateDate: Date) => {
    const date = new Date(unformateDate);
    const dateFormated = nlBEFormatter.format(date);
    return dateFormated;
  };
  const defaultPicture = ()=> {
    if (!vacation.image_url || vacation.image_url.length == 0) {
      let defaultImg =
        'https://cdn.pixabay.com/photo/2017/10/23/05/56/summer-2880261__480.jpg';
      return defaultImg;
    }
    else return vacation.image_url
  };

  useEffect(() => {
    return () => {
      setStart(intialDate(vacation.start_date));
      setEnd(intialDate(vacation.end_date));
      setImg(defaultPicture());
    };
  }, []);

  return (
    <div className='col'>
      <div className='card'>
        <img className='card-img-top rounded-start' src={img} />
        <div className='card-body'>
          <>
            <label className='card-title'>Destination: </label>
            <span className='card-text'>{vacation.destination}</span>
          </>
          <br />
          <>
            <label htmlFor=''>Price: </label>
            <span>{vacation.price}</span>
          </>
          <br />
          <>
            <label htmlFor=''>Start date: </label>
            <span>{start}</span>
          </>
          <div>
            <label htmlFor=''>End date: </label>
            <span>{end}</span>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
export default Card;
