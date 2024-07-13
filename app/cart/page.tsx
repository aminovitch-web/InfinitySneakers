"use client";

import { useDispatch, useSelector } from "react-redux";
import { FiMinus, FiPlus } from "react-icons/fi";
import { LuTrash } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { CartItem } from "@/types";
import Currency from "@/components/currency";
import { updateItemQuantity, removeItem } from "@/store/slices/cart-slice";
import Summary from "./_components/summary";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (
    productId: string,
    sizeId: string,
    quantity: number
  ) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ productId, size: sizeId, quantity }));
    }
  };

  const handleRemoveItem = (productId: string, sizeId: string) => {
    dispatch(removeItem({ productId, size: sizeId }));
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <header className="mt-6">
        <div className="mx-auto flex items-center justify-between">
          <h3 className="font-bold text-2xl">Your Cart</h3>
        </div>
      </header>

      <main className="grid lg:grid-cols-[1.9fr_1fr] gap-8 mt-6">
        {cartItems.items.length < 1 ? (
          <div className="flex flex-col gap-6 items-start">
            <div className="flex text-neutral-500">Cart is Empty</div>
            <Button asChild variant="infinitySneakers" size="xl">
              <Link href="/shop">Go Shop</Link>
            </Button>
          </div>
        ) : (
          <div>
            <ul>
              {cartItems.items.map((item: CartItem) => {
                // Find the stock information for the current item
                const stock = item.product.stocks.find(
                  (s) => s.sizeId === item.size.id
                );

                return (
                  <li
                    key={`${item.product.id}-${item.size.id}`}
                    className="grid grid-cols-[100px_1fr_auto] items-center gap-4"
                  >
                    <div className="w-full aspect-square relative mt-5">
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name || ""}
                        sizes="30vw"
                        className="rounded-lg object-cover"
                        fill
                      />
                    </div>

                    <div className="grid gap-1">
                      <Link
                        href={`/shop/${item.product.slug}/${item.product.id}`}
                      >
                        <h3 className="font-semibold">{item.product.name}</h3>
                      </Link>
                      <span className="text-muted-foreground">
                        <Currency value={item.product.price} />
                      </span>

                      <span className="text-muted-foreground">
                        Size: {item.size.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            item.size.id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity === 1}
                      >
                        <FiMinus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            item.size.id,
                            item.quantity + 1
                          )
                        }
                        disabled={
                          stock ? item.quantity >= stock.quantity : true
                        } // Disable if quantity exceeds stock
                      >
                        <FiPlus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          handleRemoveItem(item.product.id, item.size.id)
                        }
                      >
                        <LuTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <Summary cartItems={cartItems} />
      </main>
    </div>
  );
};

export default CartPage;
