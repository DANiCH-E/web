import React, {useEffect, useState} from "react";
import "./Registration.css"
import {Link} from "react-router-dom";
// import {checkAuthenticated} from "./checkAuthenticated";
import { Button } from './components/button';
export function Registration(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState([]);
    const [username1, setUsername] = useState('');
    const [password1, setPassword] = useState('')
    const [booktime, setTime] = useState([])


    // useEffect(()=>{
    //     checkAuthenticated();
    // },[]);


    const booking = () => {
        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username1, password: password1})
        }
        fetch("http://127.0.0.1:8000/api/register/", request);
    };


    return (
        <div >

            {/*<Header/>*/}
            <div className='container mt-5'>
                <h1 className="title">Регистрация</h1>
                <form>
                    {/*<CSRFToken/>*/}
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
                <Button  type="primary" onClick={booking} > Зарегистрироваться</Button>

                <p className='form-label'>
                    Уже есть аккаунт? <Link to='/login'> Войти</Link>
                </p>
            </div>

        </div>
    );
}

export default Registration;