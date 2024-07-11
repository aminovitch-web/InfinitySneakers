"use client";

import React from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cartItems = useSelector((state: any) => state.cart);
  console.log(cartItems);

  return <div>cart</div>;
};

export default CartPage;
