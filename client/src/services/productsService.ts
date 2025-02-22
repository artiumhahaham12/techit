import axios from "axios";
import Product from "../interfaces/Product";
import { getUserById } from "./userService";
const api:string = `${process.env.REACT_APP_API}/products`
export function getAllProducts() {
    return axios.get(api);
}
export function getProductById(id:string) {
    return axios.get(`${api}/${id}`);
}
export function addProduct(product: Product) {
    return axios.post(api, product);
}
export function updateProduct(id:string,newProduct:Product) {
    return axios.put(`${api}/${id}`,newProduct);
}
export function deleteProduct(id: string) {
    
  return axios.patch(`${api}/${id}`,{available:false});
}
export async function checkIfAdmin() {
    try {
        if (localStorage.getItem("user") != null) {
            let user = await getUserById();
            console.log(user.data.isAdmin);
            return user.data.isAdmin
        } 
        else {
            return false;
        }
    } catch (error) {
        console.log(error);
        
    }
}
