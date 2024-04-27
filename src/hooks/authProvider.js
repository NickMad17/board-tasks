import {useContext} from "react";
import {AuthContext} from "@/config/authProvider.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}