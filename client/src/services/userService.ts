import axios from "axios";
import User from "../interfaces/User"

const api: string = `${process.env.REACT_APP_API}`

export function checkUser(user: User){
  console.log(api, user);
    return axios.post(`${api}/login`,user);
}
export function addUser(user: User) {
  
    return axios.post(`${api}/register`, user);
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
export function getProfile() {
  console.log(JSON.parse(localStorage.getItem("token") as string) );
  
  return axios.get(`${api}/users/profile`, { headers: { Authorization: JSON.parse(localStorage.getItem("token") as string)  } })

  
}