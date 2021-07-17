import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import {
  removeOneQuantityFromCart,
  addProductToCart,
} from "../../redux/actions/shoppingCartActions";
import { openCart } from "../../redux/actions/uiActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// MUI Icons
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const styles = {
  addButton: {
    position: "absolute",
    left: "80%",
    bottom: "23%",
  },
  quantityControl: {
    backgroundColor: "#ffcc80",
    borderRadius: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: "45%",
    left: "53%",
  },
  iconButton: {
    padding: "5px",
  },
};
class ProductQuantityControl extends Component {
  handleAddOne = () => {
    this.props.authenticated
      ? this.props.addProductToCart(this.props.pid)
      : this.props.openCart();
  };
  handleRemoveOne = () => {
    this.props.removeOneQuantityFromCart(this.props.pid);
  };

  render() {
    const { classes, cart, pid } = this.props;
    const productInCart = cart.filter((product) => product.pid === pid);

    return (
      <div>
        {productInCart[0] ? (
          <div className={classes.quantityControl}>
            <ToolTip title="Quitar 1">
              <IconButton
                className={classes.iconButton}
                onClick={this.handleRemoveOne}
              >
                <RemoveIcon style={{ color: "black" }} />
              </IconButton>
            </ToolTip>
            <Typography>{productInCart[0].cantidad}</Typography>
            <ToolTip title="Añadir 1">
              <IconButton
                onClick={this.handleAddOne}
                className={classes.iconButton}
              >
                <AddIcon style={{ color: "black" }} />
              </IconButton>
            </ToolTip>
          </div>
        ) : (
          <ToolTip title="Añadir a la cesta">
            {/* {!authenticated ? }  */}
            {/* NOT Authenticated => show a message/alert telling them to LOGIN/REGISTER */}

            <IconButton
              className={classes.addButton}
              onClick={this.handleAddOne}
            >
              <AddShoppingCartIcon color="primary" />
            </IconButton>
          </ToolTip>
        )}
      </div>
    );
  }
}

ProductQuantityControl.propTypes = {
  removeOneQuantityFromCart: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, {
  removeOneQuantityFromCart,
  addProductToCart,
  openCart,
})(withStyles(styles)(ProductQuantityControl));
