import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../components/button';
import { OrderItem } from '../../components/order-item';
import { calcTotalPrice } from '../../components/utils';
import './order-page.css';


export const OrderPage = () => {
  const items = useSelector(state => state.cart.itemsInCart);
  
  if (items.length == 0) {
    return <h1>Ваша корзина пуста</h1>
  }
  const endOfTheWord = () => {
    if ((items.length % 10) < 5 && (items.length % 10) > 1) {
      return'а'
    }
      else if ((items.length % 10) != 1) return 'ов'
      return ''
    }

  return (
    <div>
    <div className='header'>
                        <img src={require("/game_app/src/logo.png")} className="logo"/>
                        <div className='header-text'>Cart</div>
    </div>
    <div className='order-page'>
      <div className='order-page__left'> 
          { items.map(game => <OrderItem game={game}/>)}
        </div>
        <div className='order-page__right'>
          <div className='order-page__total-price'>
            <span>
                {items.length} товар{endOfTheWord()} на сумму: {calcTotalPrice(items)} руб.
            </span>
          </div>
        </div>
        <div class="button-width">
                            <form action="/zak">
                                <Button type="primary">Оформить заказ</Button>
                            </form>
                        </div>
    </div>
    </div>
  )
}
