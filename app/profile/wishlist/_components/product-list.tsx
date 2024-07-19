import { Product } from "@/types";
import NoResults from "@/components/no-results";
import ProductCard from "./product-card";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ items, title }) => {
  return (
    <div className="grid gap-4 rounded-lg bg-background mt-6 shadow-sm">
      <h3 className="font-bold text-2xl max-md:mt-6">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
