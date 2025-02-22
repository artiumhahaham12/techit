import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getProfile, getUserById } from "../services/userService";
import User from "../interfaces/User";

interface ProfileProps {
    
}
 
const Profile: FunctionComponent<ProfileProps> = () => {
    const [user, setUser] = useState<User>({
      name: "",
      email: "",
      password: "",
      isAdmin: false,
    });
    
  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  }
  ,[])
  return (
    <>
    <Navbar />
      <div className="m-0 m-auto w-25">
      Profile
    
      
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {user.isAdmin && <p>You are an admin</p>}
      </div>
    </>
    );
}
 
export default Profile;