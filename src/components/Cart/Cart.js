import React from 'react';
import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [checkoutShow, setCheckoutShow] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setCheckoutShow(true);
  };

  const sendOrderHandler = async (customer) => {
    const order = {
      orderList: cartCtx.items,
      total: cartCtx.totalAmount,
      custoner: customer,
    };

    setIsSending(true);
    try {
      const response = await fetch('https://nepozdno-react-movies-default-rtdb.europe-west1.firebasedatabase.app/ordered_meals.json', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Something went wrong');
      };

      const data = await response.json();

      console.log(data);
      setIsSending(false);
      setIsSuccess(true);
      cartCtx.clearList();
    } catch (error) {
      setError(error.message);
    };
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  );

  const modalCart = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkoutShow && <Checkout onCancel={props.onClose} onSendOrder={sendOrderHandler} />}
      {!checkoutShow && modalActions}
    </React.Fragment>
  );

  const sendingOrder = (
    <p className={classes.message}>Your order is sending</p>
  );

  const successSent = (
    <React.Fragment>
      <p>Your order has been recieved</p>
      <div className={classes.actions}>
        <button onClick={props.onClose}>Close</button>
      </div>
    </React.Fragment>
  );

  const errorMessage = (
    <p className={classes.message}>{error}</p>
  )

  let content = modalCart;

  if (isSending) {
    content = sendingOrder;
  };

  if (isSuccess) {
    content = successSent
  };

  if (error) {
    content = errorMessage;
  };

  return (
    <Modal onClose={props.onClose}>
      {content}
    </Modal>
  )
}

export default Cart;
