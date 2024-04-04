import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  
  const [token,setToken]=useState(
    localStorage.getItem('token')
  )

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };
  
  let isLoggedIn= !!token;
  console.log("isLoggedIn:",isLoggedIn)

  // tacking the logout functionality

  const LogoutUser=()=>{
    setToken("")
    return localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn,storeTokenInLS,LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
