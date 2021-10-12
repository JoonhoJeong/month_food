import React, { useEffect, useState, useRef } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../Config';
import Axios from 'axios';
import './ThisMonthFoods.css';
import XMLParser from 'react-xml-parser';
import FoodCard from './FoodCard';

function ThisMonthFoods() {
  const [monthFoodList, setMonthFoodList] = useState([]);
  const storageMethodCounter = useRef(0);

  useEffect(() => {
    // let monthFoodsURL = API_URL + 'monthFdmtLst';
    let url = 'monthFdmtLst';
    Axios.post(url, null, {
      params: {
        thisYear: '2015',
        thisMonth: '09',
        apiKey: API_KEY,
      },
    })
      .then((response) => {
        let xml = new XMLParser().parseFromString(response.data);
        let items = xml.getElementsByTagName('item');
        // console.log(items);
        let arr = [];
        arr = items.map((item) => {
          return {
            fdmtNm: item
              .getElementsByTagName('fdmtNm')[0]
              .value.replace(/ >/g, ''),
            rtnFileCours: item
              .getElementsByTagName('rtnFileCours')[0]
              .value.replace(/ >/g, '')
              .split('|')[0],
            rtnStreFileNm: item
              .getElementsByTagName('rtnStreFileNm')[0]
              .value.replace(/ >/g, '')
              .split('|')[0],
            cntntsNo: item
              .getElementsByTagName('cntntsNo')[0]
              .value.replace(/ >/g, ''),
          };
        });
        getMonthFoodDetail(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getMonthFoodDetail = (arr) => {
    let url = 'monthFdmtDtl';
    // console.log('monthFoodList? ', monthFoodList.length);

    arr.map((item, index) => {
      // console.log('jjh1', item);
      Axios.post(url, null, {
        params: {
          cntntsNo: item.cntntsNo,
          apiKey: API_KEY,
        },
      })
        .then((response) => {
          let xml = new XMLParser().parseFromString(response.data);
          // console.log(xml);
          let cstdyMthDtl = xml.getElementsByTagName('cstdyMthDtl');
          // console.log(cstdyMthDtl[0].value.split('■ 손질법')[0]);
          arr[index].storageMethod = cstdyMthDtl[0].value.split('■ 손질법')[0];
          console.log('arr', arr);
          console.log('arr.length');
          storageMethodCounter.current++;
          if (storageMethodCounter.current === arr.length) {
            storageMethodCounter.current = 0;
            setMonthFoodList(arr);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  console.log('monthFoodList', monthFoodList, Array.isArray(monthFoodList));
  console.log('monthFoodList[0]', monthFoodList[0]);
  // console.log(monthFoodList[0].storageMethod);
  if (monthFoodList[0]) {
    console.log(
      `www.nongsaro.go.kr/${monthFoodList[0].rtnFileCours}/${monthFoodList[0].rtnStreFileNm}`
    );
  }

  return (
    <div className='ThisMonthFoods'>
      <div className='container'>
        {Array.isArray(monthFoodList) &&
          monthFoodList.map((item) => {
            return <FoodCard monthFood={item} key={item.cntntsNo}/>;
          })}
        {/* <FoodCard monthFoodList={monthFoodList} /> */}
      </div>
    </div>
  );
}

export default ThisMonthFoods;