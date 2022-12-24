import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {deleteGame, SetId} from "./redux/cart/reducer";
import { Button } from './components/button';
import axios from "axios";
import Header from "./header";
import "./Registration.css";
export function Delete(){
    const [error, setError] = useState(null);
    const users = useSelector(state => state.cart.itemsUsers);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState([]);
    const [name1, setTitle] = useState('');
    const [developer1, setDeveloper] = useState('')
    const [publisher1, setPublisher] = useState('');
    const [pk1, setId] = useState(null);
    const [price1, setPrice] = useState('');
    const navigate = useNavigate();

    
    async function deleteGame() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            }
        };
        const body = JSON.stringify({pk: pk1})

        const res = await axios.delete(`http://127.0.0.1:8000/games/${pk1}/`,body, config)

            dispatch(SetId(res.data.pk))
            // dispatch(SetDeveloper(res.data.developer))
            // dispatch(SetPublisher(res.data.publisher))
            // dispatch(SetGenre(res.data.genre))
            // dispatch(SetPrice(res.data.price))
    }

    const dispatch = useDispatch();
    const handleClick = () => {
        deleteGame();
        navigate("/games");
    };
    const viewGame = function() {
        
    };

    return (
        <div >

            {/* <Header/> */}
            <div className='container mt-5'>
                <h1 className="title">Удаление</h1>
                <form>
                    <div className="form-group">
                        <label className='form-label'>ID игры: </label>
                        <input type ="text" className="form-control"
                               placeholder= "ID"
                               onChange ={(event) => setId(event.target.value)}
                               />
                    </div>
                    

                </form>
                <Button type="primary" onClick={handleClick} > Удалить</Button>


                

            </div>

        </div>
    );
}

export default Delete;