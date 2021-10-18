import React from 'react';
import RecipeList from './RecipeList';
import ThisMonthFoods from './ThisMonthFoods';

function MainPage() {
  const month = 11;
  const year = [2017, 2018, 2019];
  return (
    <div>
      <ThisMonthFoods month={month} year={year} />
      <RecipeList month={month} year={year} />
    </div>
  );
}

export default MainPage;
