import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Setauther, Setusername, Setpk} from "./redux/cart/reducer";
import { Button } from './components/button';
import axios from "axios";
import Header from "./header";
import "./Registration.css";
export function Auth(){
    const [error, setError] = useState(null);
    const users = useSelector(state => state.cart.itemsUsers);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState([]);
    const [username1, setUsername] = useState('');
    const [password1, setPassword] = useState('')
    const navigate = useNavigate();

    async function checkAuthenticated (){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            }
        };

        const res = await axios.get(`http://127.0.0.1:8000/authenticated`, config)
        console.log(res.data)
    }
    async function checkuser() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const res = await axios.get(`http://127.0.0.1:8000/profile`, config)
        console.log(res)

    }
    async function checklogin() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            }
        };
        const body = JSON.stringify({username: username1, password: password1})

        const res = await axios.post(`http://127.0.0.1:8000/login`,body, config)

        if (res.data.success){
            console.log(res.data.success)
            dispatch(Setauther(true))
            dispatch(Setusername(res.data.username))
            dispatch(Setpk(res.data.pk))
            viewGame();
        }
        else{
            console.log(res.data.error)
            dispatch(Setauther(false))
            dispatch(Setusername(''))
            alert('Логин или пароль неверны. Повторите попытку')
        }
    }

    const dispatch = useDispatch();
    const handleClick = () => {
        checklogin()
    };
    const viewGame = function() {
        navigate("/games");
    };

    return (
        <div >

            <Header/>
            <div className='container mt-5'>
                <h1 className="title">Войти в аккаунт</h1>
                <form>
                    <div className="form-group">
                        <label className='form-label'>Username: </label>
                        <input type ="text" className="form-control"
                               placeholder= "username"
                               onChange ={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Password: </label>

                        <input type ="password" className="form-control"
                               placeholder= "password"
                               onChange ={(event) => setPassword(event.target.value)}/>
                    </div>

                </form>
                <Button type="primary" onClick={handleClick} > Войти</Button>


                <p className='form-label'>
                    Вы не зарегистрированы? <Link to='/register'> Зарегистрироваться</Link>
                </p>

            </div>

        </div>
    );
}

export default Auth;