import React, { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const getLocalCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};
const saveLocalCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.payload.id);
      newState = exists
        ? state.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state, action.payload];
      break;
    }
    case 'INCREASE':
      newState = state.map(i =>
        i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      break;
    case 'DECREASE':
      newState = state
        .map(i =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter(i => i.quantity > 0);
      break;
    case 'REMOVE':
      newState = state.filter(i => i.id !== action.payload.id);
      break;
    case 'CLEAR':
      newState = [];
      break;
    default:
      return state;
  }
  saveLocalCart(newState);
  return newState;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, [], getLocalCart);

  useEffect(() => {
    saveLocalCart(state);
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
