import React from 'react';
import RecipeList from './RecipeList';
import ThisMonthFoods from './ThisMonthFoods';

function MainPage(props) {
  console.log('render MainPage');
  return (
    <div>
      <ThisMonthFoods month={props.month} year={props.year} />
      <RecipeList month={props.month} year={props.year} />
    </div>
  );
}

export default MainPage;
