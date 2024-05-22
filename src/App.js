import { BrowserRouter} from "react-router-dom";
import UserProvider from "./components/User/UserProvider";
import AppRoutes from "./components/AppRoutes";
import Product from "./components/Product";

function App() {
  
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes></AppRoutes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
