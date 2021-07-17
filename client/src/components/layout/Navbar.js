import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Components
import Login from "./Login";
import Register from "./Register";
import AddNewProduct from "../products/AddNewProduct";
import ShoppingCart from "../shoppingCart/ShoppingCart";
// Images
import Susys from "../../images/susys.png";
// Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
// MUI
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// MUI Icons
import LogoutIcon from "@material-ui/icons/ExitToApp";

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { authenticated, isAdmin } = this.props;

    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {authenticated ? (
            // AUTHENTICATED
            <Fragment>
              <div>
                <Link to="/">
                  <img src={Susys} style={{ width: "130px" }} alt="susy's" />
                </Link>
              </div>
              {isAdmin ? ( // If an ADMIN, show ADD New Product Icon
                <AddNewProduct />
              ) : (
                ""
              )}
              <div>
                <ShoppingCart />
                {/* Logout button */}
                <ToolTip title="Cerrar Sesión">
                  <IconButton onClick={this.handleLogout}>
                    <LogoutIcon />
                  </IconButton>
                </ToolTip>
              </div>
            </Fragment>
          ) : (
            // UNAUTHENTICATED
            <Fragment>
              <div>
                <Link to="/">
                  <img src={Susys} style={{ width: "130px" }} alt="susy's" />
                </Link>
              </div>
              <div>
                <ShoppingCart />
                <Login />
                <Register />
              </div>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  isAdmin: state.user.isAdmin,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
