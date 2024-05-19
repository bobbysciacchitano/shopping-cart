import { CartItems, OnCartRemove } from "../types";

type CartProps = {
  cart: CartItems;
  onCartRemove: OnCartRemove;
  onClosePanel: VoidFunction;
};

export default function Cart({ cart, onCartRemove, onClosePanel }: CartProps) {
  return (
    <>
      <h2>Cart</h2>

      <ul>
        <li>
          <button type="button" onClick={onClosePanel}>
            x
          </button>
        </li>
      </ul>

      <ul>
        {cart.map(({ productId, quantity }) => (
          <li key={productId}>
            {productId}, {quantity}
            <button type="button" onClick={() => onCartRemove(productId)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
