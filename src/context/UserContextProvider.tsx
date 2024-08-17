import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [title , setTitle] = useState(null)
  const [type , setType] = useState('')
  const [loggedIn , setLoggedIn] = useState(false)   
  const [toggle , setToggle] = useState(false)
  return <UserContext.Provider value={{loggedIn, setLoggedIn , type , setType ,title, setTitle , toggle , setToggle}}>{children}</UserContext.Provider>;
};

export default UserContextProvider;