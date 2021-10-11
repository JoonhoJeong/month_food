import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../Config';
import Axios from 'axios';
import './ThisMonthFoods.css';
import XMLParser from 'react-xml-parser';

function ThisMonthFoods() {
  const [monthFoodList, setMonthFoodList] = useState({
    fdmtNm: null,
    rtnFileCours: null,
    rtnStreFileNm: null,
    cntntsNo: null,
    storageMethod: null,
  });
  const [storageMethod, setStorageMethod] = useState(null);
  useEffect(() => {
    // let monthFoodsURL = API_URL + 'monthFdmtLst';
    let url = 'monthFdmtLst';
    Axios.post(url, null, {
      params: {
        thisYear: '2015',
        thisMonth: '09',
        apiKey: '20210927YDGGO5VZ65DA9GRKISG',
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
          apiKey: '20210927YDGGO5VZ65DA9GRKISG',
        },
      })
        .then((response) => {
          let xml = new XMLParser().parseFromString(response.data);
          // console.log(xml);
          let cstdyMthDtl = xml.getElementsByTagName('cstdyMthDtl');
          // console.log(cstdyMthDtl[0].value.split('■ 손질법')[0]);
          arr[index].storageMethod = cstdyMthDtl[0].value.split('■ 손질법')[0];
          setMonthFoodList(arr);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  console.log(monthFoodList);
  console.log(monthFoodList[0]);
  // console.log(monthFoodList[0].storageMethod);
  if (monthFoodList[0]) {
    console.log(
      `www.nongsaro.go.kr/${monthFoodList[0].rtnFileCours}/${monthFoodList[0].rtnStreFileNm}`
    );
  }

  return (
    <div className='ThisMonthFoods'>
      <div className='container'>
        <div className='box'>
          <div className='imgBx'>
            {Array.isArray(monthFoodList) && (
              <img
                src={`https://www.nongsaro.go.kr/${monthFoodList[0].rtnFileCours}/${monthFoodList[0].rtnStreFileNm}`}
                alt='img1'
              />
              // <img src='https://picsum.photos/200' alt='display image' />
            )}
          </div>
          <div className='content'>
            <h3>{Array.isArray(monthFoodList) && monthFoodList[0].fdmtNm}</h3>
            <p>
              {Array.isArray(monthFoodList) && monthFoodList[0].storageMethod}
              {/* hello */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThisMonthFoods;
