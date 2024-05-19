import { OnSelectProduct, ProductRecords } from "../types";

type ProductsProps = {
  products: ProductRecords;
  onShowProduct: OnSelectProduct;
};

export default function Products({ products, onShowProduct }: ProductsProps) {
  return (
    <>
      <h2>Products</h2>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button type="button" onClick={() => onShowProduct(product)}>
              {product.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
