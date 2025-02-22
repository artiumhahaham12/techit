import axios from "axios";
import User from "../interfaces/User"

const api: string = `${process.env.REACT_APP_API}/users`

export function checkUser(user: User){
    return axios.get(`${api}?email=${user.email}&password=${user.password}`);
}
export function addUser(user:User){
    return axios.post(api, user);
}
export function getUserById() {
    const id: string = JSON.parse(localStorage.getItem("user") as string) 
    
    return axios.get(`${api}/${id}`);
}
export async function checkAdmin() {
  try {
    if (localStorage.getItem("user") != null) {
      let id: string = JSON.parse(localStorage.getItem("user") as string);
      let isAdmin = await getUserById();
      console.log(1);

      return isAdmin.data.isAdmin as boolean;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}