import axios from "axios";
import Product from "../interfaces/Product";
import { getProductById } from "./productsService";
import { error } from "console";

const api: string = `${process.env.REACT_APP_API}/carts`;


export function createCart(userId: string) {
  return axios.post(`${api}`, { userId, active: true, products: [] });
}
export async function getProductFromCart(userId: string) {
    try {
        // 1.get products array from user's cart
        let userId: string = JSON.parse(
          localStorage.getItem("userId") as string
        );
        let userCart: any = await axios.get(`${api}?userId=${userId}&&active=true`);
        // create get request to get product full ditails
        let promises:any = []
        for (let id of userCart.data[0].products) {
            promises.push(getProductById(id))
        }
        return Promise.all(promises)
    } catch (error) {
        console.log(error);
        
    }
}
getProductFromCart("0")
export async function addToCart(productId: string) {
  try {
    // get user products in cart
    let userId: string = JSON.parse(localStorage.getItem("userId") as string);
    let userCart: any = await axios.get(`${api}?userId=${userId}&&active=true`);
    // push array
    userCart.data[0].products.push(productId);
    // patch to products array
    return axios.patch(`${api}/${userCart.data[0].id}`, {
      products: userCart.data[0].products,
    });
  } catch (error) {
    console.log(error);
  }
}
console.log(1);
