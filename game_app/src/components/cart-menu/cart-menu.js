import React from 'react'
import { Button } from '../button'
import { calcTotalPrice } from '../utils'
import './cart-menu.css';
import {CartItem} from '../cart-item'

export const CartMenu = ({items, onClick}) => {
  return (
    <div className='cart-menu'>
        <div className='cart-menu__games-list'>
            {
                items.length > 0
                 ? items.map(game => (
                 <CartItem
                  key={game.name} 
                  price={game.price} 
                  title={game.name} 
                  id={game.pk}
                  />
                  )) 
                : 'Корзина пуста'}
        </div>
        {
            items.length > 0 ?
            <div class="cart-menu__arrange">
                <div className='cart-menu__total-price'>
                    <span>Итого:</span>
                    <span>{calcTotalPrice(items)} руб.</span>
                </div>
                <Button type="primary" size="m" onClick={ onClick }>
                    Оформить заказ
                </Button>
            </div>
            : null
        }
    </div>
  )
}
