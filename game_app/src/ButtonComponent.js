import React, {useEffect, useReducer, useState} from "react";
import {increm} from "./actions";
import { Link } from "react-router-dom";
import Games from "./Games";

export default function ButtonComponent(props ){
    const {counter, dispatch} = props;

    return(
            <button className="btn btn-primary" onClick={ ()=> dispatch(increm(counter))} >В корзину</button>);


}