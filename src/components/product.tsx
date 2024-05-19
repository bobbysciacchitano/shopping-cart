import { OnCartAdd, ProductRecord } from "../types";

type ProductDetailsProps = {
  product: ProductRecord;
  onCartAdd: OnCartAdd;
  onClosePanel: VoidFunction;
};

export function ProductDetails({
  product,
  onCartAdd,
  onClosePanel,
}: ProductDetailsProps) {
  const { id, name } = product;

  return (
    <>
      <h2>{name}</h2>

      <ul>
        <li>
          <button onClick={onClosePanel}>x</button>
        </li>
      </ul>

      <p>
        <button type="button" onClick={() => onCartAdd(id)}>
          Add to Cart
        </button>
      </p>
    </>
  );
}
