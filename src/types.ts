export type ActivePane = "product" | "cart";

export type ApplicationState = {
  isReady: boolean;
  selectedProduct?: ProductRecord;
  activePane?: ActivePane;
  products: ProductRecords;
  cart: CartItems;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartItems = CartItem[];

export type ProductRecord = {
  id: string;
  name: string;
};

export type ProductRecords = ProductRecord[];

export type OnSelectProduct = (product: ProductRecord) => void;

export type OnCartAdd = (productId: string) => void;

export type OnCartRemove = (productId: string) => void;
