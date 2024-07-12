"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product, Size } from "@/types";
import WishlistCheck from "./wishlist-check";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/slices/cart-slice";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";

const Sizes = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleSizeClick = (size: Size) => {
    setSelectedSize(size);
    setQuantity(1); // Reset quantity when size changes
  };

  const selectedStock = product?.stocks.find(
    (stock) => stock.sizeId === selectedSize?.id
  );

  const handleQuantity = (type: "i" | "d") => {
    if (selectedStock) {
      if (type === "d" && quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
      if (type === "i" && quantity < selectedStock.quantity) {
        setQuantity((prev) => prev + 1);
      }
    }
  };

  const getCurrentCartQuantity = () => {
    const cartItem = cartItems.find(
      (item) =>
        item.product.id === product.id && item.size.id === selectedSize?.id
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const addToCart = () => {
    if (selectedSize && selectedStock) {
      const currentQuantityInCart = getCurrentCartQuantity();
      const totalQuantity = currentQuantityInCart + quantity;

      if (totalQuantity > selectedStock.quantity) {
        toast.error("Unfortunately you cannot add more than this size.", {
          position: "top-center",
          duration: 4000,
        });
      } else {
        dispatch(addItem({ product, quantity, size: selectedSize }));
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <h4 className="font-medium">Select a Size</h4>
      <div className="gap-2 grid grid-cols-4">
        {product?.sizes.map((size) => {
          const stock = product?.stocks.find((s) => s.sizeId === size.sizeId);

          return (
            <Button
              variant={
                selectedSize?.id === size.sizeId
                  ? "infinitySneakers"
                  : "outline"
              }
              key={size.id}
              className="text-center"
              onClick={() => handleSizeClick(size.size)}
              disabled={stock && stock?.quantity < 1}
            >
              {size.size.name}
            </Button>
          );
        })}
      </div>

      {selectedSize && selectedStock && (
        <div className="flex flex-col gap-4 mt-4">
          <h4 className="font-medium">Choose a Quantity</h4>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-zinc-100 dark:bg-zinc-800 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
                <button
                  className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                  onClick={() => handleQuantity("d")}
                  disabled={quantity === 1}
                >
                  -
                </button>
                {quantity}
                <button
                  className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                  onClick={() => handleQuantity("i")}
                  disabled={quantity === selectedStock.quantity}
                >
                  +
                </button>
              </div>
              {selectedStock.quantity < 1 ? (
                <div className="text-xs">Product is out of stock</div>
              ) : selectedStock.quantity > 10 ? (
                <div className="text-xs">Product is in stock</div>
              ) : (
                <div className="text-xs">
                  Only{" "}
                  <span className="text-orange-500">
                    {selectedStock.quantity} items
                  </span>{" "}
                  left!
                  <br /> {"Don't"} miss it
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="infinitySneakers"
          className="px-10 py-6 w-52 text-lg"
          disabled={
            !selectedSize || !selectedStock || selectedStock.quantity < 1
          }
          onClick={addToCart}
        >
          Add to Cart
        </Button>
        <WishlistCheck product={product} />
      </div>
    </div>
  );
};

export default Sizes;
