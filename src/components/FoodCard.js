import React from "react";
import { /* API_URL, API_KEY, */ IMAGE_BASE_URL } from "../Config";
import "./FoodCard.css";

function FoodCard(props) {
  console.log(props);
  return (
    <div className="foodCard">
      <img
        src={`${IMAGE_BASE_URL}${props.monthFood.rtnFileCours}/${props.monthFood.rtnStreFileNm}`}
        alt={props.monthFood.fdmtNm}
      />
      <div className="shadow"></div>
      <div className="foodName">
        <h5>이달의 식재료</h5>
        <h3>{props.monthFood.fdmtNm}</h3>
        {/* <p>
          {props.monthFood.storageMethod.split("\r\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p> */}
      </div>
    </div>
  );
}

export default FoodCard;
