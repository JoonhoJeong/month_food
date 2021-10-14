import "./App.css";
import ThisMonthFoods from "./ThisMonthFoods";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import { Route, Switch } from "react-router-dom";

function App() {
  const month = 11;
  const year = 2017;
  return (
    <div className="App">
      {/* <MonthInfo /> */}
      {/* <ThisMonthFoods /> */}
      {/* <ThisMonthRecipes /> */}
      {/* "name": "month_food", */}
      <Switch>
        <Route exact path="/">
          <ThisMonthFoods month={month} year={year} />
        </Route>
        <Route exact path="/RecipeList">
          <RecipeList month={month} year={year} />
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
