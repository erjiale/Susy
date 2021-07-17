import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import {
  removeOneQuantityFromCart,
  addProductToCart,
  removeProductFromCart,
} from "../../redux/actions/shoppingCartActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// MUI Icons
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    display: "flex",
    position: "relative",
  },
  img: {
    width: "150px",
  },
  // textField: {
  //   paddingLeft: "10%",
  // },
  quantityControl: {
    backgroundColor: "#ffcc80",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: "70%",
    top: "50%",
    borderRadius: "25px",
    width: "100px",
  },
  deleteIcon: {
    position: "absolute",
    bottom: "6%",
    left: "85%",
  },
};

class CartProductCard extends Component {
  handleAddOne = () => {
    this.props.addProductToCart(this.props.pid);
  };
  handleRemoveOne = () => {
    this.props.removeOneQuantityFromCart(this.props.pid);
  };
  handleDelete = () => {
    this.props.removeProductFromCart(this.props.pid);
  };
  render() {
    const { classes, cantidad, nombre, precio, img } = this.props;
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.img}
          // image={`http://localhost:4000/uploads/${img}`}
          // image={`https://susys-api.herokuapp.com/uploads/${img}`}
          image={`https://susys-images.s3.amazonaws.com/${img}`}
          title={nombre}
        />
        <CardContent>
          <Typography component="h5" variant="h5" className={classes.textField}>
            {nombre}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.textField}
          >
            {precio}€
          </Typography>

          <div className={classes.quantityControl}>
            <ToolTip title="Quitar 1">
              <IconButton onClick={this.handleRemoveOne}>
                <RemoveIcon style={{ color: "black" }} />
              </IconButton>
            </ToolTip>
            <Typography>{cantidad}</Typography>
            <ToolTip title="Añadir 1">
              <IconButton onClick={this.handleAddOne}>
                <AddIcon style={{ color: "black" }} />
              </IconButton>
            </ToolTip>
          </div>
          <ToolTip title="Eliminar">
            <IconButton
              className={classes.deleteIcon}
              onClick={this.handleDelete}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
          </ToolTip>
        </CardContent>
      </Card>
    );
  }
}

export default connect(null, {
  removeOneQuantityFromCart,
  addProductToCart,
  removeProductFromCart,
})(withStyles(styles)(CartProductCard));
