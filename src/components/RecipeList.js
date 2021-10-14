import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../Config";
import XMLParser from "react-xml-parser";
import RecipeCard from "./RecipeCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./Swiper.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
SwiperCore.use([EffectCoverflow, Pagination]);
function RecipeList(props) {
  const [recipeList, setRecipeList] = useState([]);

  console.log(props);
  useEffect(() => {
    let url = "monthNewFdLst";
    Axios.post(url, null, {
      params: {
        thisYear: props.year,
        thisMonth: props.month < 10 ? "0" + props.month : "" + props.month,
        apiKey: API_KEY,
      },
    })
      .then((response) => {
        let xml = new XMLParser().parseFromString(response.data);
        let items = xml.getElementsByTagName("item");
        console.log(items);
        let arr = [];
        items.map((item) => {
          let fdSeCode = item
            .getElementsByTagName("fdSeCode")[0]
            .value.replace(/ >/g, "");
          if (fdSeCode !== "290003") {
            arr.push({
              fdNm: item
                .getElementsByTagName("fdNm")[0]
                .value.replace(/ >/g, ""),
              fdSeCode: item
                .getElementsByTagName("fdNm")[0]
                .value.replace(/ >/g, ""),
              rtnFileCours: item
                .getElementsByTagName("rtnFileCours")[0]
                .value.replace(/ >/g, "")
                .split("|")[0],
              rtnStreFileNm: item
                .getElementsByTagName("rtnStreFileNm")[0]
                .value.replace(/ >/g, "")
                .split("|")[0],
              cntntsNo: item
                .getElementsByTagName("cntntsNo")[0]
                .value.replace(/ >/g, ""),
            });
          }
        });
        setRecipeList(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.month]);

  return (
    <div>
      <Swiper
        className="swiper"
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 2,
          stretch: 450,
          depth: 80,
          modifier: 2,
          slideShadows: false,
        }}
        // loop={true}
      >
        {Array.isArray(recipeList) &&
          recipeList.map((item) => {
            return (
              <SwiperSlide className="swiper-slide">
                <RecipeCard recipe={item} key={item.cntntsNo} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default RecipeList;
