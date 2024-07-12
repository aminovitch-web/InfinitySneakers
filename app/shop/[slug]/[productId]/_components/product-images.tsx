"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="w-full aspect-square relative">
        <Image
          src={items[index]?.url}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="grid grid-cols-5 max-sm:grid-cols-4 justify-between gap-2">
        {items?.map((item: any, i: number) => (
          <div
            className="w-full aspect-square relative mt-5 cursor-pointer hover:scale-105 transition"
            key={item.id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item?.url}
              alt=""
              sizes="30vw"
              className="object-cover rounded-md"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
