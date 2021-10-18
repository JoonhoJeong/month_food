import React, { useEffect, useState, useRef } from 'react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './Swiper.css';

import { /* API_URL, */ API_KEY /* IMAGE_BASE_URL */ } from '../Config';
import Axios from 'axios';
import './ThisMonthFoods.css';
import XMLParser from 'react-xml-parser';
import FoodCard from './FoodCard';

import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, {
  EffectCoverflow,
  EffectFade,
  Pagination,
  Autoplay,
} from 'swiper';

SwiperCore.use([EffectCoverflow, EffectFade, Pagination, Autoplay]);

function ThisMonthFoods(props) {
  const [monthFoodList, setMonthFoodList] = useState([]);
  const storageMethodCounter = useRef(0);
  const yearCounter = useRef(0);

  useEffect(() => {
    // let monthFoodsURL = API_URL + 'monthFdmtLst';
    let url = 'monthFdmtLst';
    let arr = [];
    props.year.map((item, index) => {
      Axios.post(url, null, {
        params: {
          thisYear: props.year[index],
          thisMonth: props.month < 10 ? '0' + props.month : '' + props.month,
          apiKey: API_KEY,
        },
      })
        .then((response) => {
          yearCounter.current++;
          let xml = new XMLParser().parseFromString(response.data);
          let items = xml.getElementsByTagName('item');
          console.log('items', yearCounter.current, items);
          items.map((item) =>
            arr.push({
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
            })
          );
          // getMonthFoodDetail(arr);
          if (yearCounter.current === props.year.length) {
            console.log('jjh1', yearCounter.current, props.year.length, arr);
            setMonthFoodList(arr);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [props.month]);

  const getMonthFoodDetail = (arr) => {
    let url = 'monthFdmtDtl';
    // console.log('monthFoodList? ', monthFoodList.length);

    arr.forEach((item, index) => {
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
    <section>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        pagination={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {monthFoodList.map((item) => (
          <SwiperSlide>
            <FoodCard
              monthFood={item}
              month={props.month}
              key={item.cntntsNo}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ThisMonthFoods;
