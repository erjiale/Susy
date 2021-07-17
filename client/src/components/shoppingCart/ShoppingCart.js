import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { getCartProducts } from "../../redux/actions/shoppingCartActions";
import {
  openCart,
  closeCart,
  openLogin,
  closeLogin,
  openRegister,
  closeRegister,
} from "../../redux/actions/uiActions";
// Components
import CartProductCard from "./CartProductCard";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
// MUI Icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CloseIcon from "@material-ui/icons/Close";

import Susys from "../../images/susys.png";

const styles = {
  badge: {
    right: -3,
    top: 13,
    padding: "0 4px",
  },
  closebutton: {
    position: "absolute",
    left: "90%",
    zIndex: "1",
  },
  dialogTitle: {
    textAlign: "center",
    position: "relative",
    paddingBottom: "0",
  },
  content: {
    marginTop: "10px",
  },
  loginContainer: {
    margin: "8px 0",
    position: "relative",
    textAlign: "center",
  },
  submitButton: {
    margin: "0 0 30px 0",
    width: "50%",
    padding: "10px 0",
    fontWeight: "bold",
    left: "25%",
  },
  totalPrice: {
    width: "40%",
    fontWeight: "bold",
    left: "30%",
    position: "relative",
    margin: "30px 0 10px 0",
  },
};
// const theme = useTheme();
// const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

const withMediaQuery = (...args) => (Component) => (props) => {
  const mediaQuery = useMediaQuery(...args);
  return <ShoppingCart mediaQuery={mediaQuery} {...props} />;
};

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      oldPath: "",
      newPath: "",
    };
  }
  componentDidMount() {
    if (this.props.authenticated) this.props.getCartProducts();
  }
  handleOpen = () => {
    this.props.openCart();
  };
  handleClose = () => {
    this.props.closeCart();
  };
  // open LOGIN modal box
  handleOpenLogin = () => {
    this.props.closeCart();
    let oldPath = window.location.pathname;
    const newPath = `/login`;
    if (oldPath === newPath) oldPath = "/"; // handles case where we don't have oldPath

    // when a dialog is opened, this will change the url to newPath
    window.history.pushState(null, null, newPath);

    this.setState({
      oldPath,
      newPath,
    });
    this.props.openLogin();
  };

  // open REGISTER modal box and change url to '/register'
  handleOpenRegister = () => {
    this.props.closeCart();
    let oldPath = window.location.pathname;
    const newPath = `/register`;
    if (oldPath === newPath) oldPath = "/"; // handles case where we don't have oldPath

    window.history.pushState(null, null, newPath);

    this.setState({
      oldPath,
      newPath,
    });
    this.props.openRegister();
  };

  render() {
    const {
      classes,
      mediaQuery,
      cart: { cart, count, totalPrice },
      ui,
      authenticated,
    } = this.props;

    // Render Each Product added into OUR Shopping CART
    const productsInCart = (
      <Grid container spacing={1}>
        {cart.map((product) => (
          <Grid key={product.pid} item xs={12} sm={12} md={6}>
            <CartProductCard
              pid={product.pid}
              cantidad={product.cantidad}
              nombre={product.nombre}
              precio={product.precio}
              img={product.img}
            />
          </Grid>
        ))}
      </Grid>
    );

    return (
      <Fragment>
        <ToolTip title="Cesta de la Compra">
          <IconButton onClick={this.handleOpen}>
            <Badge color="secondary" badgeContent={count} showZero>
              {count >= 5 ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
            </Badge>
          </IconButton>
        </ToolTip>

        <Dialog
          open={ui.openCart}
          onClose={this.handleClose}
          fullScreen={mediaQuery}
          maxWidth="lg"
          fullWidth
        >
          <ToolTip title="Cerrar" className={classes.closebutton}>
            <IconButton onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </ToolTip>
          <DialogTitle className={classes.dialogTitle}>
            <img src={Susys} style={{ width: "26%" }} alt="Susy's" />
            <p style={{ margin: "0", fontSize: "1.25em" }}>
              TU CARRITO ({count})
            </p>
          </DialogTitle>
          <DialogContent className={classes.content}>
            {cart[0] ? (
              // Render each product in our Shopping CART
              <div>{productsInCart}</div>
            ) : (
              <div>
                <Typography align="center" variant="body1">
                  Tu carrito está vacío
                </Typography>
                {!authenticated ? (
                  <div>
                    <div className={classes.loginContainer}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={this.handleOpenLogin}
                      >
                        INICIA SESIÓN
                      </Button>
                      &nbsp;o&nbsp;
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={this.handleOpenRegister}
                      >
                        CREA UNA CUENTA
                      </Button>
                    </div>
                    <Typography align="center" variant="body1">
                      para añadir productos al carrito y
                    </Typography>
                    <Typography align="center" variant="body1">
                      llevártelos a casa!
                    </Typography>
                  </div>
                ) : null}
              </div>
            )}
          </DialogContent>
          <Typography className={classes.totalPrice}>
            TOTAL &nbsp;{totalPrice} ¥
          </Typography>

          <Button
            type="submit"
            variant="contained"
            className={classes.submitButton}
            color="primary"
          >
            Finalizar Compra
          </Button>
        </Dialog>
      </Fragment>
    );
  }
}

ShoppingCart.propTypes = {
  classes: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  getCartProducts: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
  closeCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  authenticated: state.user.authenticated,
  ui: state.ui,
});

const mapActionsToProps = {
  getCartProducts,
  openCart,
  closeCart,
  openLogin,
  closeLogin,
  openRegister,
  closeRegister,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withMediaQuery("(max-width: 770px)")(ShoppingCart)));
