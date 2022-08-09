import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import IVacation from '../../Models/IVacation';
import { ActionType } from '../../redux/action-type';
import { SocketContext } from '../../services/socket-container';
import { AppState } from '../../redux/app-state';
import AddVacation from './AddVacation';

function VacationsPages() {
  const dispatch = useDispatch();
  let vacations = useSelector((state: AppState) => state.vacations);
  let [pageNumber, setPageNumber] = useState(1);
  let [amountOfItemsPerPage, setAmountOfItemsPerPage] = useState(10);
  let isUserAdmin = true;

  const socket = useContext(SocketContext);

  useEffect(() => {
    getVacationsByPage(pageNumber, amountOfItemsPerPage);
  }, [pageNumber]);

  if (socket) {
    socket.on('add-product', (vacation: IVacation) => {
      dispatch({ type: ActionType.AddVacation, payload: vacation });
    });
  }

  async function getVacationsByPage(
    pageNumber: number,
    amountOfItemsPerPage: number
  ) {
    try {
      let url = `http://localhost:3001/vacations?page=${pageNumber}&itemsPerPage=${amountOfItemsPerPage}`;

      let response = await axios.get(url);
      let vacations: IVacation[] = response.data;

      dispatch({ type: ActionType.GetVacationsByPage, payload: vacations });
    } catch (e) {
      console.error(e);
      alert('Failed to retrieve vacations');
    }
  }

  function onNextClicked() {
    pageNumber++;
    setPageNumber(pageNumber);
  }

  function onBackClicked() {
    pageNumber--;
    setPageNumber(pageNumber);
  }

  return (
    <div className='vacations'>
      <div className='bd-example container'>
        {/* <div className='row row-cols-1 row-cols-md-3 row-col-sd-2 g-4'> */}
        <div className='row row-cols-2 row-cols-lg-3 g-2 g-lg-3'>
          {isUserAdmin && (
            <div className='col'>
              {' '}
              <AddVacation />
            </div>
          )}

          {vacations.map((vacation) => (
            <Card vacation={vacation} key={vacation.vacationId} />
          ))}
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <input
              type='button'
              disabled={pageNumber == 1}
              value='back'
              onClick={() => onBackClicked()}
            />
            <p>Page: {pageNumber}</p>
            <input type='button' value='next' onClick={() => onNextClicked()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VacationsPages;
