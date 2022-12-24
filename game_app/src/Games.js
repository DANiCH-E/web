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


function Games() {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState('');
    
    const [min_price, setMin] = useState();
    const [max_price, setMax] = useState();
    const [isManager, setIsManager] = useState(false);

    const filteredGames = items.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase())
    })
    const navigate = useNavigate();
    const viewAuth = function() {
        navigate("/login");
    };

    

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/games/`)
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
    const [price, setPrice] = React.useState([500, 3000])

    const minDistance = 10;

     const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return
        }

        if (activeThumb === 0) {
            setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]])
        } else {
            setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)])
        }
    }

    const marks = [
        {
            value: 0,
            label: '0 ₽',
        },
        {
            value: 250,
            label: '250 ₽',
        },
        {
            value: 500,
            label: '500 ₽',
        },
        {
            value: 750,
            label: '750 ₽',
        },
        {
            value: 3000,
            label: '3000 ₽',
        },
    ];

    function valuetext(price) {
        return `${price} Р`;
    }

    
    async function userCheck() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const res = await axios.get(`http://127.0.0.1:8000/api-auth/login`, config)
        return res.data.username
    }

    if(error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
            return (
                
                    <div className='container-text' >

                    
                    <div className='header'>
                        <img src={require("/game_app/src/logo.png")} className="logo"/>
                        <div className='header-text'>Games</div>
                    
                        <div class="button-width">
                            <Button 
                                class="button_right" 
                                type="primary"
                                onClick={viewAuth}
                            >Войти
                            </Button>
                        </div>
                        <div class="button-width">
                            <form action="/add">
                                <Button type="primary">Добавить</Button>
                            </form>
                        </div>
                        <div class="button-width">
                            <form action="/delete">
                                <Button type="primary">Удалить</Button>
                            </form>
                        </div>
                        <div class="button-width">
                            <form action="/update">
                                <Button type="primary">Обновить</Button>
                            </form>
                        </div>
                        <div class="button-width">
                            <form action="/zak">
                                <Button type="primary">Страница заказов</Button>
                            </form>
                        </div>
                    </div>

                    <div className='wrapper header__cart-btn-wrapper'>
                        <CartBlock />
                    </div>
                    
                    <input 
                        type="text"
                        className="input"
                        placeholder="Search..."
                        onChange={(event) => setValue(event.target.value)}
                    />
                    
                    <div className="mx-auto">
                    <Box sx={{width: 400}}>
                        <Slider
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            value={price}
                            onChange={handleChange}
                            marks={marks}
                            disableSwap
                            step={10}
                            min={0}
                            max={3000}
                        />
                    </Box>
                </div>
                            {filteredGames.filter((item) => item.price >= price[0] && item.price <= price[1]).map(item=>(
                                
                                <div key={item.pk}>
                                
                                    <div className='block-level'>
                                    <img src={require("/game_app/public/images/"+item.img)} className="image"/>
                                        <br/><Link to={`/games/${item.pk}`} className='text_atrib'>{item.name}</Link>
                                        
                                        <br/><div className='price'>{item.price} руб.</div> 
                                        <Button
                                            type="primary"
                                            onClick={ (e) => {
                                                e.stopPropagation();
                                                dispatch(setItemInCart(item))
                                            } }
                                        >
                                            В корзину
                                        </Button>
                                        {/* {filterServices.filter((item: { price: number }) => item.price >= price[0] && item.price <= price[1]).map((item => <ToyPreview toy={item} key={item.pk}/>))} */}
                                    </div>
                                </div>
                            ))}
                            
                                </div>
                                

            );
        }
}


export default Games;