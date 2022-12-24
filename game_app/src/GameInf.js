import React, {Component, useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import './Games.css'
import './GamesElem.css'

function GameInf() {
    const{pk} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/games/${pk}/`)
        .then (res => res.json())
        .then(

            (result) =>{
                setIsLoaded(true);
                setItems(result);
                },

            (error) =>{
                setIsLoaded(true);
                setError(error);
            }
        )
        
    }, [])
    
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            
            <div key={items.pk}>
                
                <div className='header'>
                <img src={require("/game_app/src/logo.png")} className="logo"/>
                    <div className='header-text'>{items.name}</div>
                    <br/><Link className='text_atrib' to="/games">{'<'} Games </Link>
                </div>
                <div className='content'>
                    
                    
                
                    <div className='text_atrib'>
                    
                        <div>Release date: {items.release_date}</div>
                        <div>Developer: {items.developer}</div>
                        <div>Publisher: {items.publisher}</div>
                        <div>Description: {items.description}</div>
                        <div>Genre: {items.genre}</div>
                        <div>Price: {items.price}</div>

                        <div ><img src={require("/game_app/public/images/"+items.img)} className="game_block"/></div>
                    </div>
                    
                </div>
                

                

            </div>
        );
    }
}


export default GameInf;

