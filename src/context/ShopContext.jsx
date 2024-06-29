import React, { createContext, useState } from "react";
import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null);
// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < all_product.length + 1; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // const addToCart = (itemId) => {
  //   console.log(cartItems);
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  // };
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };
  // const getTotalCartAmount = () => {
  
  //   let total = 0;
  //   for (const item in cartItems) {
  //     let cartInfo = all_product.find((item) => item._id === item);
  //     totalAmount += cartInfo.new_price * cartItems[item];
  //   }
  //   return totalAmount;

  // };
  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      let itemInfo = all_product.find((product) => product.id === Number(item));
      total += itemInfo.new_price * cartItems[item];
    }
    return total;
  };

  const contextValue = {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
