import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../Config';
import Axios from 'axios';
import './ThisMonthFoods.css';
import XMLParser from 'react-xml-parser';

function ThisMonthFoods() {
  useEffect(() => {
    // let monthFoodsURL = API_URL + 'monthFdmtLst';
    let monthFoodsURL = 'monthFdmtLst';
    Axios.post(monthFoodsURL, null, {
      params: {
        thisYear: '2015',
        thisMonth: '09',
        apiKey: '20210927YDGGO5VZ65DA9GRKISG',
      },
    })
      .then((response) => {
        console.log(response);
        let xml = new XMLParser().parseFromString(response.data);
        console.log(xml);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <div className="ThisMonthFoods">
      <div className="container">
        <div className="box">
          <div className="imgBx">
            <img src="" alt="img1" />
          </div>
          <div className="contents"></div>
        </div>
      </div>
    </div>
  );
}

export default ThisMonthFoods;
