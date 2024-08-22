import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";


// eslint-disable-next-line react/prop-types
function GuardRoute({ children }) {
  let token = localStorage.getItem('token');

  try {
    const decoded = jwtDecode(token);
    if (decoded.role != 'user') {
      localStorage.clear();
      return <Navigate to={"/login"} />;
    }

    if (token) return children;
  } catch (error) {
    localStorage.clear();
    return <Navigate to={"/login"} />;
  }

}

export default GuardRoute