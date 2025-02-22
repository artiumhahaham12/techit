

import Product from "./Product";

export default interface Cart {
  id?: string;
  userId: string;
  products: string[];
  active: boolean;
}