import {createContext, useState} from "react";
import {password} from "@/config/staticData.js";

export const AuthContext = createContext(null)


const AuthProvider = ({children}) => {
  const token = localStorage.getItem('userId')
  const [session, setSession] = useState(token && token.split('_').at(-1) === password ? token : null)

  return <AuthContext.Provider value={{
    session,
    setSession
  }}>{children}</AuthContext.Provider>
};

export default AuthProvider;