import './App.css';
import ThisMonthFoods from './ThisMonthFoods';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import { Route, Switch } from 'react-router-dom';

function App() {
  const month = 11;
  return (
    <div className="App">
      {/* <MonthInfo /> */}
      {/* <ThisMonthFoods /> */}
      {/* <ThisMonthRecipes /> */}
      {/* "name": "month_food", */}
      <Switch>
        <Route exact path="/">
          <ThisMonthFoods month={month} />
        </Route>
        <Route exact path="/RecipeList">
          <RecipeList month={month} />
        </Route>
        <Route exact path="/RecipeDetail/:cntntsNo" component={RecipeDetail} />
        {/* cntntsNo/ */}
        {/* <Route exact path="/RecipeDetail">
          <RecipeDetail />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
