import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { isAuthenticated, user } = useContext(Context);

  if(!isAuthenticated) return (<Loader/>)
  if(isAuthenticated) 
    return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
    )
};

export default Profile;
