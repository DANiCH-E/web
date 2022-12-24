import React, {Component, useState, useEffect, useReducer} from 'react';
import { Button } from './components/button';
import {
    Link, useParams
} from "react-router-dom";
import {Box, Slider} from "@mui/material";
import { CartBlock } from './components/cart-block';
import './Games.css'
import './GamesElem.css'
import './InputString.css'
import { useDispatch, useSelector } from "react-redux"
import { setItemInCart } from './redux/cart/reducer';
import './Range.css';
import { useNavigate } from 'react-router-dom';
import Editing from './Editing';
import axios from "axios";


function Zakazy() {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState('');
    
    const [min_price, setMin] = useState();
    const [max_price, setMax] = useState();
    const [isManager, setIsManager] = useState(false);

    
    const navigate = useNavigate();
    const viewAuth = function() {
        navigate("/login");
    };

    

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/basket/`)
        .then (res => res.json())
        .then(

            (result) =>{
                setIsLoaded(true);
                setItems(result);
            },
            (error) =>{
            setIsLoaded(true);
            setItems(error);
            }
        )
    }, [])
    
    const dispatch = useDispatch();
   

    
    

    if(error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
            return (
                
                    <div className='container-text' >

                    
                    <div className='header'>
                        <img src={require("/game_app/src/logo.png")} className="logo"/>
                        <div className='header-text'>Заказы</div>
                        <br/><Link className='text_atrib' to="/games">{'<'} Games </Link>
                        
                    </div>

                    
                    
                    
                    
                    <div className="mx-auto">
                </div>
                            {items.map(item=>(
                                
                                <div key={item.pk}>
                                
                                    <div className='block-level'>
                                    
                                        <br/><Link to={`/games/${item.pk}`} className='text_atrib'> Пользователь:{item.user_id}</Link>
                                        
                                        <br/><div className='price'>Игра: {item.game_id}</div> 
                                        <br/><div className='price'>Статус покупки: {item.buyed}</div>
                                        <br/><div className='price'>Статус установки: {item.installed}</div>  
                                        
                                    </div>
                                </div>
                            ))}
                            
                                </div>
                                

            );
        }
}


export default Zakazy;