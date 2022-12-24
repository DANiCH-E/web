import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import React from "react";
import Games from './Games';
import GameInf from './GameInf';
import { Provider } from "react-redux";
import { store } from "./redux";
import {OrderPage} from "./pages/order-page";
import Registration from './Registration';
import Auth from './auth';
import Editing from './Editing';
import Delete from './Delete';
import Update from './Update';
import Zakazy from './Zakazy';



function App() {
  return (
      <Provider store={store}>
        <BrowserRouter basename="/">
          <div>
            
            <Routes>
              <Route exact path="/" element={<Games/>}/>
              <Route exact path="/games" element={<Games/>}/>
              <Route exact path={`/games/:pk`} element={<GameInf/>}></Route>
              <Route exact path={"/order"} element={<OrderPage/>}></Route>
              <Route exact path={"/register"} element={<Registration/>}></Route>
              <Route exact path={"/login"} element={<Auth/>}></Route>
              <Route exact path={"/add"} element={<Editing/>}></Route>
              <Route exact path={"/delete"} element={<Delete/>}></Route>
              <Route exact path={"/update"} element={<Update/>}></Route>
              <Route exact path={"/zak"} element={<Zakazy/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>

  );
}

export default App;