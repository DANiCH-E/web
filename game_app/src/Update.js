import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {SetTitle, SetDeveloper, SetGenre, SetPublisher, SetId} from "./redux/cart/reducer";
import { Button } from './components/button';
import axios from "axios";
import Header from "./header";
import "./Update.css";
export function Update(){
    const [error, setError] = useState(null);
    const users = useSelector(state => state.cart.itemsUsers);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState([]);
    const [name1, setTitle] = useState('');
    const [developer1, setDeveloper] = useState('')
    const [publisher1, setPublisher] = useState('');
    const [pk1, setId] = useState(null);
    const [genre1, setGenre] = useState('');
    const [price1, setPrice] = useState('');
    const navigate = useNavigate();

    
    async function updateGame() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            }
        };
        const body = JSON.stringify({name: name1, developer: developer1, publisher: publisher1, genre: genre1,pk: pk1})

        const res = await axios.put(`http://127.0.0.1:8000/games/${pk1}/`,body, config)

            dispatch(SetId(res.data.pk))
            dispatch(SetDeveloper(res.data.developer))
            dispatch(SetPublisher(res.data.publisher))
            dispatch(SetGenre(res.data.genre))
            //dispatch(SetPrice(res.data.price))
    }

    const dispatch = useDispatch();
    const handleClick = () => {
        updateGame();
        navigate("/games");
    };
    const viewGame = function() {
        
    };

    return (
        <div >

            {/* <Header/> */}
            <div className='container mt-5'>
                <h1 className="title">Обновление</h1>
                <form>
                    <div className="form-group">
                        <label className='form-label'>ID игры: </label>
                        <input type ="text" className="form-control"
                               placeholder= "ID"
                               onChange ={(event) => setId(event.target.value)}
                               />
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Название: </label>
                        <input type ="text" className="form-control"
                               placeholder= "title"
                               onChange ={(event) => setTitle(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Разработчик: </label>

                        <input type ="text" className="form-control"
                               placeholder= "developer"
                               onChange ={(event) => setDeveloper(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Издатель: </label>

                        <input type ="text" className="form-control"
                               placeholder= "publisher"
                               onChange ={(event) => setPublisher(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Жанр: </label>

                        <input type ="text" className="form-control"
                               placeholder= "genre"
                               onChange ={(event) => setGenre(event.target.value)}/>
                    </div>

                </form>
                <Button type="primary" onClick={handleClick} > Обновить</Button>


                

            </div>

        </div>
    );
}

export default Update;