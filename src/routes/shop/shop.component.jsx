import { ProductsProvider } from "../../contexts/products.context";
import SHOP_DATA from "../../shop-data.json";

const Shop = () => {
  return (
    <ProductsProvider>
      <div>
        {SHOP_DATA.map(({ id, name }) => (
          <div key={id}>
            <h1>{name}</h1>
          </div>
        ))}
      </div>
    </ProductsProvider>
  );
};

export default Shop;
