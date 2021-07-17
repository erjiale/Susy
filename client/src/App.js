import React from "react";
import "./App.css";
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import axios from "axios";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { logoutUser, setUserAuthenticated } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";
// Components/Pages
import Navbar from "./components/layout/Navbar";
import home from "./pages/home";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffcc80",
    },
    secondary: {
      main: "#b71c1c",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const token = localStorage.IdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    // expired token
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["auth-token"] = token;
    store.dispatch(setUserAuthenticated(decodedToken));
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={home} />
              <Route exact path="/register" component={home} />
              <Route exact path="/verificar/:token" component={home} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
