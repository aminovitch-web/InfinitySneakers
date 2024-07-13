"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProductRedirectProps {
  product: any;
}

const ProductRedirect: React.FC<ProductRedirectProps> = ({ product }) => {
  const router = useRouter();

  useEffect(() => {
    if (!product) {
      router.replace("/");
    }
  }, [product, router]);

  return null;
};

export default ProductRedirect;
