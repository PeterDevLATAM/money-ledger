import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/nav-bar/nav-bar.component.jsx";
import Home from "./pages/home/home.component.jsx";
import Login from "./pages/login/login.component.jsx";
import Signup from "./pages/signup/signup.component.jsx";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path={"/"}>
              {user && <Home />}
              {!user && <Redirect to={"/login"} />}
            </Route>
            <Route path={"/login"}>
              {!user && <Login />}
              {user && <Redirect to={"/"} />}
            </Route>
            <Route path={"/signup"}>
              {!user && <Signup />}
              {user && <Redirect to={"/"} />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
