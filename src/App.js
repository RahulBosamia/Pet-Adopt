//imports
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
//pages & components
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import Donate from "./Pages/Donate";
import Adopt from "./Pages/Adopt";
import Logout from "./Pages/Logout";
import AdoptPage from "./Pages/AdoptPage";

import Navigation from "./Components/Navigation";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserPets from "./Pages/UserPets";


function App({ loggedIn }) {
  let routes;
  if (loggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/donate" exact component={Donate} />
        <Route path="/adopt" exact component={Adopt} />
        <Route path="/adopt/:id" exact component={AdoptPage} />
        <Route path="/userpets" component={UserPets} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Redirect to="/signin" />
      </Switch>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navigation />
        {routes}
      </div>
    </Router>
  );
}

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid ? true : null,
});

export default connect(mapStateToProps)(App);
