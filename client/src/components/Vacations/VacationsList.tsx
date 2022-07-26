import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import IVacation from '../../Models/IVacation';
import Card from '../layout/Card';

function VacationsList() {
  let vacations = useSelector((state: AppState) => state.vacations);
  const dispatch = useDispatch();

  useEffect(() => {
    GetAllVacations();
  }, []);

  async function GetAllVacations() {
    try {
      const response = await axios.get('http://localhost:3001/vacations');
      let vacationsArray: IVacation[] = response.data;
    // dispatch({ type: ActionType.GetAllVacations, payload: vacationsArray });
    } catch (e) {
      console.log('Failed to retrive vacations');
    }
  }

  return (
    <div className='vacations '>
      <div className='bd-example container'>
        <h2>Vacations List</h2>
        <div className='row row-cols-1 row-cols-md-3 g-4'>
          
            {vacations.map((vacation) => {
              return <Card vacation={vacation} key={vacation.vacation_id} />;
            })}
          
        </div>
      </div>
    </div>
  );
}

export default VacationsList;
