import { useContext, useState } from "react";
import UserContext from "../../components/User/UserContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const login = () => {
    if (!firstName || !lastName || !password) {
      return;
    }
    userLogin({ firstName, lastName, password })
      .then(() => {
        navigate("/product");
      })
      .catch((error) => {
        if (error.message === "unknown user") {
          navigate("/register");
        }
      });
  };

  return (
    <div className={styles.loginWrapper}>
      <input
        placeholder="User first name"
        onBlur={(e) => setFirstName(e.target.value)}
      />
       <input
        placeholder="User last name"
        onBlur={(e) => setLastName(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onBlur={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => login()}>Login</button>
    
    </div>
  );
};

export default Login;
