import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../layout/Card';
import IVacation from '../../Models/IVacation';

function VacationsPages() {
  let [vacations, setVacations] = useState<IVacation[]>([]);
  let [pageNumber, setPageNumber] = useState(1);
  let [amountOfItemsPerPage, setAmountOfItemsPerPage] = useState(6);

  useEffect(() => {
    getVacationsByPage(pageNumber, amountOfItemsPerPage);
  }, [pageNumber]);

  async function getVacationsByPage(
    pageNumber: number,
    amountOfItemsPerPage: number
  ) {
    try {
      let url = `http://localhost:3001/vacations?page=${pageNumber}&itemsPerPage=${amountOfItemsPerPage}`;

      let response = await axios.get(url);
      let vacations: IVacation[] = response.data;

      setVacations(vacations);
      console.log(vacations);
      return vacations;

      //dispatch({ type: ActionType.GetVacations, payload: vacations })
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
        <div className='row row-cols-1 row-cols-md-3 g-4'>
          {vacations.map((vacation) => (
            <Card vacation={vacation} key={vacation.vacation_id} />
          ))}
          <>
            <input
              type='button'
              disabled={pageNumber == 1}
              value='back'
              onClick={() => onBackClicked()}
            />
            <p>Page: {pageNumber}</p>
            <input type='button' value='next' onClick={() => onNextClicked()} />
            
          </>
        </div>
      </div>
    </div>
  );
}

export default VacationsPages;
