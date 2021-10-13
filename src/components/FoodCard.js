import React from "react";
import { /* API_URL, API_KEY, */ IMAGE_BASE_URL } from "../Config";

function FoodCard(props) {
  console.log(props);
  return (
    <div className="food_card">
      <div className="imgBx">
        <img
          src={`${IMAGE_BASE_URL}${props.monthFood.rtnFileCours}/${props.monthFood.rtnStreFileNm}`}
          alt={props.monthFood.fdmtNm}
        />
      </div>
      <div className="content">
        <h3>{props.monthFood.fdmtNm}</h3>
        <p>
          {props.monthFood.storageMethod.split("\r\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default FoodCard;
