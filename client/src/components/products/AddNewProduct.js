import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { addProduct } from "../../redux/actions/productActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
// MUI Icons
import AddIcon from "@material-ui/icons/Add";

const styles = {
  dialogTitle: {
    textAlign: "center",
    paddingBottom: 0,
  },
  formStyle: {
    position: "relative",
  },
  textField: {
    width: "70%",
    marginLeft: "15%",
    marginTop: "10px",
  },
  submitButton: {
    width: "70%",
    padding: "10px 0",
    fontWeight: "bold",
    margin: "3% 0 3% 15%",
  },
  imgPreviewDiv: {
    width: "70%",
    margin: "3% 0 3% 15%",
    position: "relative",
  },
  imgPreview: {
    maxWidth: "100%",
    maxHeight: "200px",
    objectFit: "cover",
    margin: "auto",
    borderStyle: "ridge",
  },
  uploadImageButton: {
    width: "70%",
    marginLeft: "15%",
    marginTop: "10px",
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "grey",
    },
  },
};

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      nombre: "",
      precio: "",
      img: {},
      errors: {},
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { nombre, precio, img } = this.state;
    if (nombre.length === 0) {
      this.setState({
        errors: { nombre: "Este campo no puede estar vacío" },
      });
    } else if (precio.length === 0) {
      this.setState({
        errors: { precio: "Este campo no puede estar vacío" },
      });
    } else if (img.name === undefined) {
      this.setState({
        errors: { img: "Hay que subir una imagen" },
      });
    } else {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("precio", precio);
      formData.append("img", img, img.name);
      this.props.addProduct(formData);
      this.handleClose();
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
      nombre: "",
      precio: "",
      errors: {},
      img: {},
    });
  };
  handleImgPreview = (event) => {
    if (event.target.files.length > 0) {
      this.setState({
        img: event.target.files[0],
      });
      let src = URL.createObjectURL(event.target.files[0]);
      let preview = document.getElementById("imagePreview");
      preview.src = src;
      preview.style.display = "block";
    }
  };
  handleEditImage = () => {
    const file = document.getElementById("imageUpload");
    file.click();
  };
  render() {
    const { classes } = this.props;
    const { nombre, precio, errors } = this.state;
    return (
      <Fragment>
        <ToolTip title="Añadir Producto">
          <IconButton onClick={this.handleOpen}>
            <AddIcon />
          </IconButton>
        </ToolTip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle className={classes.dialogTitle}>
            Añade un nuevo producto
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} className={classes.formStyle}>
              <TextField
                label="Nombre"
                type="text"
                name="nombre"
                value={nombre}
                className={classes.textField}
                onChange={this.handleChange}
                variant="outlined"
                error={errors && errors.nombre ? true : false}
                helperText={errors.nombre}
              />
              <TextField
                label="Precio"
                type="number"
                name="precio"
                value={precio}
                className={classes.textField}
                onChange={this.handleChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
                error={errors && errors.precio ? true : false}
                helperText={errors.precio}
              />
              <input
                type="file"
                id="imageUpload"
                className={classes.textField}
                onClick={this.handleImgPreview}
                onChange={this.handleImgPreview}
                hidden="hidden"
              />
              <Button
                className={classes.uploadImageButton}
                onClick={this.handleEditImage}
              >
                Subir Imagen
              </Button>
              {errors && errors.img ? (
                <p className={classes.textField} style={{ color: "red" }}>
                  {errors.img}
                </p>
              ) : (
                ""
              )}
              <div className={classes.imgPreviewDiv}>
                <img id="imagePreview" className={classes.imgPreview} alt="" />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                AÑADIR
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default connect(null, { addProduct })(withStyles(styles)(AddProduct));
