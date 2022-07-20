import axios from 'axios';
import React from 'react';
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
  // let servers = useSelector((state: AppState) => state.servers);
  //const [serverStatus, setServerStatus] = useState('NULL');
  const dispatch = useDispatch();
  

//   const changeServerStatus = async (vacation:IVacation) => { 
//     //let curentStatus = server.status;
//     try {
//       const response = await axios.post('http://localhost:3001/',{ vacation });
//       console.log(response);
//       dispatch({type : ActionType.ChangeStatus, payload: vacation});
//           } 
//           catch (e) {
//       console.log('change status function -Failed to retrive vacations');

//     }

  //}

  return (
    <div className='card'>
      <div className='card-body'>
        <div>
          <h5 className='card-title'>
            <label htmlFor=''>Destination:</label>
            <span> {vacation.destination}</span>
          </h5>
        </div>
        <div>
          <img  src={vacation.image_url}/>
        </div>
        <div>
          <label htmlFor=''>Price: </label>
          <span>{vacation.price}</span>
        </div>
        <div>
          <label htmlFor=''>Start date: </label>
          <span>{vacation.start_date}</span>
        </div>
        <div>
          <label htmlFor=''>End date: </label>
          <span>{vacation.end_date}</span>
        </div>


      </div>
    </div>
  );
}
export default Card;
