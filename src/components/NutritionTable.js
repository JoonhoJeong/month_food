import React from "react";
import "./RecipeDetail.css";

function NutritionTable(props) {
  return (
    <>
      <div className="nutritionGroup">
        <div>
          <div className="title03">
            <h1>영양성분표</h1>
            <h2>1인분 기준</h2>
          </div>
          <ul>
            <li>
              <div className="text_Description02">
                <div>에너지</div>
                <div>{props.recipeDetail.enargy}kcal</div>
              </div>
            </li>
            <li>
              <div className="text_Description02">
                <div>탄수화물</div>
                <div>{props.recipeDetail.carbohydrate}g</div>
              </div>
            </li>
            <li>
              <div className="text_Description02">
                <div>단백질</div>
                <div>{props.recipeDetail.protein}g</div>
              </div>
            </li>
            <li>
              <div className="text_Description02">
                <div>지방</div>
                <div>{props.recipeDetail.fat}g</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NutritionTable;
