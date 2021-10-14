import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, IMAGE_BASE_URL } from "../Config";
import Axios from "axios";
import XMLParser from "react-xml-parser";
import "./RecipeDetail.css";

function RecipeDetail(props) {
  let cntntsNo = props.match.params.cntntsNo;
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    var host = window.location.protocol
      .concat("//")
      .concat(window.location.host);
    let url = `${host}/monthNewFdDtl`;
    Axios.post(url, null, {
      params: {
        cntntsNo: cntntsNo,
        apiKey: API_KEY,
      },
    })
      .then((response) => {
        let xml = new XMLParser().parseFromString(response.data);
        console.log(xml);
        let items = xml.getElementsByTagName("item");
        console.log(items);
        let obj;
        let howToCook = [];
        let imagesPath = [];
        let imagesName = [];
        let ingredientStr = [];

        items.map((item) => {
          howToCook = item
            .getElementsByTagName("ckngMthInfo")[0]
            .value.replace(/ >/g, "")
            .split(/[0-9][.]/); //조리 방법
          imagesPath = item
            .getElementsByTagName("rtnFileCours")[0]
            .value.replace(/ >/g, "")
            .split("|");
          imagesName = item
            .getElementsByTagName("rtnStreFileNm")[0]
            .value.replace(/ >/g, "")
            .split("|");
          ingredientStr = item
            .getElementsByTagName("matrlInfo")[0]
            .value.replace(/ >/g, "")
            .split("▶");
          obj = {
            fdNm: item.getElementsByTagName("fdNm")[0].value.replace(/ >/g, ""), //요리명
            howToCook: howToCook,
            imagesPath: imagesPath,
            imagesName: imagesName,
            ingredientStr: ingredientStr,
            calcium: item
              .getElementsByTagName("clciQy")[0]
              .value.replace(/ >/g, ""), //칼슘
            carbohydrate: item
              .getElementsByTagName("crbQy")[0]
              .value.replace(/ >/g, ""), //탄수화물
            // matrlInfo: item
            //   .getElementsByTagName("matrlInfo")[0]
            //   .value.replace(/ >/g, ""), //재료정보
            phphmntNm: item
              .getElementsByTagName("phphmntNm")[0]
              .value.replace(/ >/g, ""), //인분명
            enargy: item
              .getElementsByTagName("energyQy")[0]
              .value.replace(/ >/g, ""), //에너지양
            fat: item
              .getElementsByTagName("ntrfsQy")[0]
              .value.replace(/ >/g, ""), //지질량
            protein: item
              .getElementsByTagName("protQy")[0]
              .value.replace(/ >/g, ""), //단백질
            fiber: item
              .getElementsByTagName("edblfibrQy")[0]
              .value.replace(/ >/g, ""), //식이섬유
            vtmA: item
              .getElementsByTagName("vtmaQy")[0]
              .value.replace(/ >/g, ""), //비타민A
            vtmE: item
              .getElementsByTagName("vteQy")[0]
              .value.replace(/ >/g, ""), //비타민E
            vtmC: item
              .getElementsByTagName("vtcQy")[0]
              .value.replace(/ >/g, ""), //비타민C
            thiaQy: item
              .getElementsByTagName("thiaQy")[0]
              .value.replace(/ >/g, ""), //티아민
            niboplaQy: item
              .getElementsByTagName("niboplaQy")[0]
              .value.replace(/ >/g, ""), //리보플라빈
            na: item.getElementsByTagName("naQy")[0].value.replace(/ >/g, ""), //나트륨
            kal: item
              .getElementsByTagName("ptssQy")[0]
              .value.replace(/ >/g, ""), //칼륨
            iron: item
              .getElementsByTagName("irnQy")[0]
              .value.replace(/ >/g, ""), //철분
          };
        });
        console.log(obj);
        setRecipeDetail(obj);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cntntsNo]);

  console.log("recipeDetail", recipeDetail);
  return (
    <>
      {recipeDetail && (
        <div className="recipeDetailMain">
          <div className="ImageBox">
            <img
              src={`${IMAGE_BASE_URL}${recipeDetail.imagesPath[0]}/${recipeDetail.imagesName[0]}`}
              alt="recipe main"
            />
            <h1>{recipeDetail.fdNm}</h1>
          </div>
          <div className="ingredient">
            <h1>재료</h1>
            <div className="content">
              <div className="ImageBox">
                <img
                  src={`${IMAGE_BASE_URL}${recipeDetail.imagesPath[1]}/${recipeDetail.imagesName[1]}`}
                  alt="recipe ingrendient"
                />
              </div>
              <ul className="igroups">
                {recipeDetail.ingredientStr.map((item, index) => {
                  if (index === 0) {
                    return (
                      <li className="personNm" key={index}>
                        {recipeDetail.ingredientStr[index]}
                      </li>
                    );
                  } else {
                    return (
                      <li className="ginredientDetail" key={index}>
                        {recipeDetail.ingredientStr[index]}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
          <div className="recipeStep">
            <h1>레시피</h1>
            <div className="content">
              {recipeDetail.howToCook.map((item, index) => {
                if (recipeDetail.howToCook[index + 1]) {
                  return (
                    <div className="stepBox">
                      <div className="ImageBox">
                        <img
                          src={`${IMAGE_BASE_URL}${
                            recipeDetail.imagesPath[index + 2]
                          }/${recipeDetail.imagesName[index + 2]}`}
                          alt="recipe ingrendient"
                        />
                      </div>
                      <div className="step">Step {index + 1}</div>
                      <div className="howToCook">
                        {recipeDetail.howToCook[index + 1]}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default RecipeDetail;
