import { useCallback, useEffect, useState } from "react";
import Products from "../components/products";
import {
  ApplicationState,
  OnCartAdd,
  OnCartRemove,
  OnSelectProduct,
} from "../types";
import { ProductDetails } from "../components/product";
import Cart from "../components/cart";

const InitialState = {
  isReady: false,
  cart: [],
  products: [],
};

export default function Application() {
  const [state, setState] = useState<ApplicationState>(InitialState);

  useEffect(() => {
    async function setup() {
      const [products] = await Promise.all([
        fetch("/products.json").then((response) => response.json()),
      ]);

      setState((current) => ({ ...current, isReady: true, products }));
    }

    setup();
  }, []);

  const onShowProduct = useCallback<OnSelectProduct>((selectedProduct) => {
    setState((current) => ({
      ...current,
      selectedProduct,
      activePane: "product",
    }));
  }, []);

  const onShowCart = useCallback(() => {
    setState((current) => ({ ...current, activePane: "cart" }));
  }, []);

  const onClosePanel = useCallback(() => {
    setState((current) => ({
      ...current,
      activePane: undefined,
      selectedProduct: undefined,
    }));
  }, []);

  const onCartAdd = useCallback<OnCartAdd>((productId) => {
    setState((current) => {
      if (current.cart.find((item) => item.productId === productId)) {
        return {
          ...current,
          cart: [
            ...current.cart.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          ],
        };
      }

      return {
        ...current,
        cart: [...current.cart, { productId, quantity: 1 }],
      };
    });
  }, []);

  const onCartRemove = useCallback<OnCartRemove>((productId) => {
    setState((current) => {
      return {
        ...current,
        cart: [...current.cart.filter((item) => item.productId !== productId)],
      };
    });
  }, []);

  const { isReady, products, cart, activePane, selectedProduct } = state;

  if (!isReady) {
    return null;
  }

  return (
    <>
      <h1>Cart</h1>

      <ul>
        <li>
          <button type="button" onClick={onShowCart}>
            Cart
          </button>
        </li>
      </ul>

      <hr />

      <Products products={products} onShowProduct={onShowProduct} />

      {activePane === "product" && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onCartAdd={onCartAdd}
          onClosePanel={onClosePanel}
        />
      )}

      {activePane === "cart" && (
        <Cart
          cart={cart}
          onCartRemove={onCartRemove}
          onClosePanel={onClosePanel}
        />
      )}
    </>
  );
}
