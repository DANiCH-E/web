import React from 'react';
import { useDispatch } from 'react-redux';
import './order-item.css';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { deleteItemFromCart } from '../../redux/cart/reducer';

export const OrderItem= ({game}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(deleteItemFromCart(game.pk));
    }
    
  return (
    <div className='order-item'>
        <div className='order-item__cover'>
        <img src={require("/game_app/public/images/"+game.img)} className="image"/>
        </div>
        <div className='order-item__title'>
            <span>
                {game.name}
            </span>
        </div>
        <div className='order-item__price'>
            <span>
                {game.price} руб.
                <AiOutlineCloseCircle
                    size={25}
                    className="cart-item__delete-icon"
                    onClick={handleClick}
                />
            </span>
        </div>
    </div>
  )
}
