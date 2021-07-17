import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// REDUX
import { connect } from "react-redux";
import { deleteProduct } from "../../redux/actions/productActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
// MUI Icons
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const styles = {
  iconButton: {
    position: "absolute",
    zIndex: "1",
    left: "80%",
  },
};

class DeleteProduct extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  handleDelete = () => {
    this.props.deleteProduct(this.props.pid);
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <ToolTip title="Eliminar producto">
          <IconButton className={classes.iconButton} onClick={this.handleOpen}>
            <HighlightOffIcon color="secondary" />
          </IconButton>
        </ToolTip>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Confirma eliminar este producto</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} style={{ color: "red" }}>
              CANCELAR
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              CONFIMAR
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
DeleteProduct.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
};

export default connect(null, { deleteProduct })(
  withStyles(styles)(DeleteProduct)
);
