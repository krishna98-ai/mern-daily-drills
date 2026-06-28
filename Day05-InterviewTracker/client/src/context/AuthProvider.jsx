import { useState,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {getCurrentUser} from "../services/authService";


const AuthProvider = ({children}) => {

  const [user,setUser] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loading,setLoading] = useState(true);
console.log("Authentication render ")


console.log({
  user,
  isLoggedIn,
  loading
});
  const checkAuth = async()=>{

    try{
 console.log("checkAuth started");

      const response = await getCurrentUser();
       console.log("current user success");
        console.log(response.data.data);

      setUser(response.data.data);
      
        setIsLoggedIn(true);
    
      }catch(error){
console.log("current user failed KUCH galt hua " , error);
      setUser(null);
      setIsLoggedIn(false);


    }finally{
 console.log("loading false");

      setLoading(false);

    }

  }



  useEffect(()=>{

    checkAuth();

  },[]);



  return(

    <AuthContext.Provider

    value={{
      user,
      setUser,
      isLoggedIn,
      setIsLoggedIn,
      loading
    }}

    >

    {children}

    </AuthContext.Provider>

  )

}


export default AuthProvider;