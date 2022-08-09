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
  const [isFollowed, setIsFollowed] = useState(false);
  let isOpenFullCard = false;
  let isUsercustomer = true;

  let amountOfFollowersImg =
    'https://img.icons8.com/external-wanicon-flat-wanicon/2x/external-followers-influencer-marketing-wanicon-flat-wanicon.png';
  let addToFolloweImg = '../../images/follow.png';

  // const [destination, setDestination] = useState('');
  // const [price, setPrice] = useState(0);
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  // const [imageUrl, setImageUrl] = useState('');
  // const [description, setdescription] = useState('');

  const nlBEFormatter = new Intl.DateTimeFormat('nl-BE');

  const intialDate = (unformateDate: Date) => {
    const date = new Date(unformateDate);
    const dateFormated = nlBEFormatter.format(date);
    return dateFormated;
  };
  const defaultPicture = () => {
    if (!vacation.imageUrl || vacation.imageUrl.length == 0) {
      let defaultImg =
        'https://cdn.pixabay.com/photo/2017/10/23/05/56/summer-2880261__480.jpg';
      return defaultImg;
    } else return vacation.imageUrl;
  };

  useEffect(() => {
    return () => {
      setStart(intialDate(vacation.startDate));
      setEnd(intialDate(vacation.endDate));
      setImg(defaultPicture());
    };
  }, []);

  const followStatus = async (vacation: IVacation) => {
    //let curentStatus = server.status;
    try {
      const response = await axios.post('http://localhost:3001/vacation/follow/:id', {
        vacation,
      });
      console.log(response);
      //dispatch({type : ActionType.ChangeStatus, payload: vacation});
    } catch (e) {
      console.log('change status function -Failed to retrive servers');
    }
  };

  return (
    <div className='col'>
      <div className='card'>
        <img className='card-img-top rounded-start' src={img} />
        <div className='card-body'>
          <div className='row justify-content-center'>
            <label className='card-title col-5'>Destination: </label>
            <span className='card-text col-5'>{vacation.destination}</span>
          </div>

          <div className='row justify-content-center'>
            <label className='col-5'>Price: </label>
            <span className='col-5'>{vacation.price}</span>
          </div>

          <div className='row justify-content-center'>
            <label className='col-5'>Start date: </label>
            <span className='col-5'>{start}</span>
          </div>
          <div>
            <label className='col-5'>End date: </label>
            <span className='col-5'>{end}</span>
          </div>
          {isOpenFullCard && (
            <div className='row justify-content-center'>
              <label className='col-5'>Description: </label>
              <span className=''>{vacation.description}</span>
            </div>
          )}
          <div className='row'>
            {isUsercustomer && (
              <div className='social'>
                <p>
                  Followers:{''} {vacation.amountOfFollowers}
                </p>{' '}
                <label className='switch'>
                  <input
                    type='checkbox'
                    id='togBtn'
                    defaultChecked={false}
                    onClick={() => followStatus(vacation)}
                  />
                  <div className='slider round'></div>
                </label>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
