import './App.css';
import ThisMonthFoods from './ThisMonthFoods';
import RecipeList from './RecipeList';
import { Route, Switch } from 'react-router-dom';

function App() {
  const month = 11;
  return (
    <div className='App'>
      {/* <MonthInfo /> */}
      {/* <ThisMonthFoods /> */}
      {/* <ThisMonthRecipes /> */}

      <Switch>
        <Route exact path='/'>
          <ThisMonthFoods month={month} />
        </Route>
        <Route
          exact
          path='/RecipeList/:foodStr/:month'
          component={RecipeList}
        />
        {/* <RecipeList month={month} /> */}
        {/* </Route> */}
        {/* <Route exact path='/register' component={Auth(RegisterPage, false)} /> */}
      </Switch>
    </div>
  );
}

export default App;
