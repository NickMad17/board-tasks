import {useAuth} from "@/hooks/authProvider.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const ProtectedRoute = ({children}) => {
  const {session} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) {
      navigate('/login', {replace: true})
    }
  }, [session]);

  if (session) {
    return children
  }
};

export default ProtectedRoute;