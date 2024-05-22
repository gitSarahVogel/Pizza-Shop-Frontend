import { useEffect, useState } from "react";
import { loginService } from "../../services";
import CustomerProduct from "../CustomerProduct";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    console.log(userToken);
    if (userToken) {
      setUser({ userToken }); // TODO: add username and id
    }
  }, []);

  const userLogin = (user) => {
    return new Promise((resolve, reject) => {
      loginService(user).then((response) => {
        if (response.loginStatus === "ok") {
          localStorage.setItem("userToken", response.data.userToken);
          setUser(response.data);
          
          resolve(response.data);
        }
        if (response.loginStatus === "unknown") {
          reject(new Error("unknown user"));
        }
      });
    });
  };

  return (
    <UserContext.Provider value={{ user, userLogin }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
