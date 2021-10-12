import React from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../Config';

function FoodCard({ monthFood }) {
  console.log('FoodCard');
  return (
    <div className='box'>
      <div className='imgBx'>
        {
          <img
            src={`${IMAGE_BASE_URL}${monthFood.rtnFileCours}/${monthFood.rtnStreFileNm}`}
            alt='Food image'
          />
          // <img src='https://picsum.photos/200' alt='display image' />
        }
      </div>
      <div className='content'>
        <h3>{monthFood.fdmtNm}</h3>
        <p>
          {monthFood.storageMethod.split('\r\n').map((line, index) => {
            return (
              <span key={index}>
                {line}
                <br />
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default FoodCard;
