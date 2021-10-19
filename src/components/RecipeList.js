import React, { useEffect, useState, useRef } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../Config";
import XMLParser from "react-xml-parser";
import RecipeCard from "./RecipeCard";
import { Swiper, SwiperSlide } from "swiper/react";
import Grid from "@mui/material/Grid";
import Axios from "axios";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./Swiper.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
SwiperCore.use([EffectCoverflow, Pagination]);
function RecipeList(props) {
  const [recipeList, setRecipeList] = useState(null);
  const yearCounter = useRef(0);
  console.log(props);

  useEffect(() => {
    let url = "monthNewFdLst";
    let arr = [];
    props.year.map((item, index) => {
      Axios.post(url, null, {
        params: {
          thisYear: props.year[index],
          thisMonth: props.month < 10 ? "0" + props.month : "" + props.month,
          apiKey: API_KEY,
        },
      })
        .then((response) => {
          yearCounter.current++;
          let xml = new XMLParser().parseFromString(response.data);
          let items = xml.getElementsByTagName("item");
          console.log(items);
          items.map((item) => {
            let fdSeCode = item
              .getElementsByTagName("fdSeCode")[0]
              .value.replace(/ >/g, "");
            if (fdSeCode !== "290003" && fdSeCode !== "290002") {
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
          if (yearCounter.current === props.year.length) {
            console.log("jjh1", arr);
            setRecipeList(arr);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [props.month]);

  console.log("jjh", recipeList);
  return (
    <div style={{ padding: "30px 10px" }}>
      <h1
        style={{
          // fontFamily: ""Noto Sans KR", sans-serif"
          fontWeight: "700",
          fontSize: "27px",
          lineHeight: "28px",
          letterSpacing: "1px",
          color: "#937062",
          borderBottom: "1px solid #e0e0e0",
          margin: "10px 14px",
          paddingBottom: "8px",
        }}
      >
        이달의 레시피
      </h1>
      {/* <Swiper
        className='swiper'
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
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
              <SwiperSlide className='swiper-slide'>
                <RecipeCard recipe={item} key={item.cntntsNo} />
              </SwiperSlide>
            );
          })}
      </Swiper> */}
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 8, sm: 8, md: 8 }}
      >
        {Array.isArray(recipeList) &&
          recipeList.map((item, index) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <RecipeCard recipe={item} key={item.cntntsNo} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default RecipeList;
