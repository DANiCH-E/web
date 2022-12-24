import React, {useCallback, useEffect, useReducer, useState} from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


export default function Header(props){
    const items = useSelector(state => state.cart.itemsInCart);
    const users = useSelector(state => state.cart.itemsUsers);
    const [value,setValue] = useState('');
    const totalPrice = items.reduce((acc, item ) => acc += item.toy.price, 0);
    let [cartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/games');
    }
    const guestLinks =(
        <div>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Войти</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/register'>Регистрация</Link>
            </li>

        </div>
    )

    const authLinks =(
        <div>
            <Link to ={`/games`}>Перейти в магазин</Link>
 

        </div>
    )
    return(
        <header>
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <ul>
                            {users.isAuthenticated ? authLinks : guestLinks}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}