import { useState,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {getCurrentUser} from "../services/authService";


const AuthProvider = ({children}) => {

  const [user,setUser] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loading,setLoading] = useState(true);


  const checkAuth = async()=>{

    try{

      const response = await getCurrentUser();
      // console.log("sbse phle mai hi chla hun cookie dhund rha hun ")
      console.log(response.data.data)
      setUser(response.data.data);
    
      setIsLoggedIn(true);


    }catch(error){

      setUser(null);
      setIsLoggedIn(false);


    }finally{

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