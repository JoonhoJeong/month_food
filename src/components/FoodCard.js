import React from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../Config';
import { Link } from 'react-router-dom';
function FoodCard(props) {
  console.log(props);
  return (
    <Link to={`/RecipeList/${props.monthFood.fdmtNm}/${props.month}`}>
      <div className='box'>
        <div className='imgBx'>
          {
            <img
              src={`${IMAGE_BASE_URL}${props.monthFood.rtnFileCours}/${props.monthFood.rtnStreFileNm}`}
              alt='Food image'
            />
          }
        </div>
        <div className='content'>
          <h3>{props.monthFood.fdmtNm}</h3>
          <p>
            {props.monthFood.storageMethod.split('\r\n').map((line, index) => {
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
    </Link>
  );
}

export default FoodCard;
