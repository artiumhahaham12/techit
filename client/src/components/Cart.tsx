import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { getProductFromCart } from "../services/cartService";
import Navbar from "./Navbar";

interface CartProps {
    
}
 
const Cart: FunctionComponent<CartProps> = () => {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() =>{

        getProductFromCart(JSON.parse(localStorage.getItem("user") ?? ""))
          .then((res: any) => {
            let products = res.map((item: any) => {
              return item.data;
            });
            setProducts(products)
          })
          .catch((error) => {
            console.log(error);
          });
    }, [])
    return ( 
        <><Navbar/>
            cart
            {products.map((product) => {
                return (
                  <li key={product.id}>
                    {product.name},{product.price},{product.category},
                    {product.quantity}
                  </li>
                );
            })}
        </>
     );
}
 
export default Cart;