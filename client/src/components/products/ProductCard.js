import React, { Component, Fragment } from "react";
// REDUX
import { connect } from "react-redux";
// Components
import DeleteProduct from "./DeleteProduct";
import ProductQuantityControl from "./ProductQuantityControl";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const styles = {
  root: {
    position: "relative",
    display: "block",
    margin: "auto",
  },
  media: {
    height: 275,
    width: "100%",
    objectPosition: "50% 50%",
    margin: "auto",
  },
  priceContent: {
    paddingTop: 0,
    position: "relative",
  },
  addButton: {
    position: "absolute",
    left: "80%",
    bottom: "23%",
  },
};

class ProductCard extends Component {
  render() {
    const {
      pid,
      classes,
      nombre,
      img,
      precio,
      user: { authenticated, isAdmin },
    } = this.props;

    return (
      <Fragment key={img}>
        <Card className={classes.root}>
          {/* only ADMIN ==> Can eliminate product */}
          {authenticated && isAdmin ? <DeleteProduct pid={pid} /> : ""}
          <CardMedia
            className={classes.media}
            // image={`http://localhost:4000/uploads/${img}`}
            image={`https://susys-images.s3.amazonaws.com/${img}`}
            // image={`https://susys-api.herokuapp.com/uploads/${img}`}
            title={nombre}
          />
          <CardContent>
            <Typography>{nombre}</Typography>
          </CardContent>
          <CardContent className={classes.priceContent}>
            <Typography noWrap>{precio}¥</Typography>
            <ProductQuantityControl pid={pid} authenticated={authenticated} />
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(styles)(ProductCard));
