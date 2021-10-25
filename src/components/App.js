import './App.css';
import ThisMonthFoods from './ThisMonthFoods';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import MainPage from './MainPage';
import NavBar from './NavBar/NavBar';
import LoginPage from './LoginPage/LoginPage';
import { Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const THINQ_APP_API_SERVER = 'http://localhost:5010';
const THINQ_APP_SOCKET_SERVER =
  'wss://s7vajyybvf.execute-api.ap-northeast-2.amazonaws.com/websocket';

let access_token = null;
// "proxy": "http://api.nongsaro.go.kr/service/monthFd/"
function App() {
  // const month = 11;
  const [month, setMonth] = useState(10);
  const year = [2017, 2018, 2019];

  useEffect(() => {
    Axios.post(`${THINQ_APP_API_SERVER}/token`, {
      grant_type: 'password',
      id: 'jjhaarontest@gmail.com',
      password: '!2345qwert',
    })
      .then((response) => {
        console.log('access_token:', response);
        window.localStorage.setItem('access_token', response.data.access_token);
        access_token = response.data.access_token;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log('render App');
  console.log('localstorage', window.localStorage);
  console.log('sessionstorage', window.sessionStorage);
  return (
    <div className="App">
      {/* <MonthInfo /> */}
      {/* <ThisMonthFoods /> */}
      {/* <ThisMonthRecipes /> */}
      {/* "name": "month_food", */}
      <NavBar setMonth={setMonth} month={month} />
      <Switch>
        <Route exact path="/">
          {/* <ThisMonthFoods month={month} year={year} /> */}
          <MainPage month={month} year={year} />
        </Route>
        {/* <Route exact path='/RecipeList'>
          <RecipeList month={month} year={year} />
        </Route> */}
        <Route exact path="/RecipeDetail/:cntntsNo" component={RecipeDetail} />
        {/* cntntsNo/ */}
        {/* <Route exact path="/RecipeDetail">
          <RecipeDetail />
        </Route> */}
        <Route exact path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
