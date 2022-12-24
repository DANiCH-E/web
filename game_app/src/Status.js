
import React, {useEffect, useReducer, useState} from "react";
import reducer from "./reducer";
import {increm} from "./actions";
import { Link } from "react-router-dom";
import Games from "./Games";
import './Games.css'
import { BiCartAlt } from 'react-icons/bi'
export function Status(props){
     const {sum} = props;
     return (<div className="cart-block"><BiCartAlt size={30}/>{sum} руб.  </div>);
 }

export default Status;