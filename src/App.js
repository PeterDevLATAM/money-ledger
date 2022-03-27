import {Route, BrowserRouter, Switch} from "react-router-dom"
import Navbar from "./components/nav-bar/nav-bar.component.jsx";

import Home from "./pages/home/home.component.jsx"
import Login from "./pages/login/login.component.jsx"
import Signup from "./pages/signup/signup.component.jsx"

function App() {
  return <div className="App">
    <BrowserRouter>
      <Navbar/> 
      <Switch>
        <Route exact path={'/'}>
          <Home/>
        </Route>
        <Route  path={'/login'}>
          <Login/>
        </Route>
        <Route  path={'/signup'}>
          <Signup/>
        </Route>
      </Switch>
    </BrowserRouter>

  </div>;
}

export default App;
