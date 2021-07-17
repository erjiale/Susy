import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import {
  openLogin,
  openRegister,
  verifyUser,
} from "../redux/actions/uiActions";
// Components
import ProductCard from "../components/products/ProductCard";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class home extends Component {
  // constructor() -> componentWillMount() -> render() -> componentDidMount()
  componentDidMount() {
    let url = window.location.pathname;
    url = url.split("/");
    if (url[1] === "verificar" && url[2]) {
      // Verify User's Account and open LOGIN modal box
      this.props.verifyUser(url[2]);
      this.props.openLogin();
      window.history.pushState(null, null, "/login");
    } else if (url[1] === "login") {
      // open the LOGIN modal box if url==="/login"
      this.props.openLogin();
    } else if (url[1] === "register") {
      // open REGISTER modal box if url==="/register"
      this.props.openRegister();
    }
    this.props.getProducts();
  }

  render() {
    const { products } = this.props;

    // render => all products from database table: "productos"
    const productsCatalog = (
      <Grid container spacing={1}>
        {products.map((product) => (
          <Grid item xs={6} sm={6} md={3} key={product.pid}>
            <ProductCard
              pid={product.pid}
              nombre={product.nombre}
              img={product.img}
              precio={product.precio}
            />
          </Grid>
        ))}
      </Grid>
    );

    return (
      <Fragment>
        <Typography align="center" paragraph={true} style={{ fontSize: "2em" }}>
          Productos a la Venta
        </Typography>
        {products[0] ? (
          <div>{productsCatalog}</div>
        ) : (
          <Typography align="center">Catálogo vacío</Typography>
        )}
      </Fragment>
    );
  }
}

home.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

const mapActionsToProps = {
  getProducts,
  openLogin,
  openRegister,
  verifyUser,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
