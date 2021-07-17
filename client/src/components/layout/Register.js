import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { clearErrors, registerUser } from "../../redux/actions/userActions";
import {
  openLogin,
  openRegister,
  closeRegister,
} from "../../redux/actions/uiActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// MUI Icons
import CloseIcon from "@material-ui/icons/Close";

import Susys from "../../images/susys.png";

const styles = {
  submitButton: {
    margin: "30px 0 30px 0",
    width: "60%",
    padding: "10px 0",
    fontWeight: "bold",
    left: "20%",
  },
  closebutton: {
    position: "absolute",
    left: "90%",
  },
  formStyle: {
    position: "relative ",
  },
  dialogTitle: {
    textAlign: "center",
    paddingBottom: "0",
  },
  textField: {
    width: "60%",
    marginLeft: "20%",
    marginTop: "10px",
  },
  switchButton: {
    fontWeight: "bold",
    marginBotton: "100px",
    fontSize: "1.2em",
  },
  switchContainer: {
    textAlign: "center",
    margin: "0",
  },
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      oldPath: "",
      newPath: "",
    };
  }
  componentDidMount() {
    if (window.location.pathname === "/register") this.handleOpen();
  }

  // register the user passing the credentials input
  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      usuario: this.state.username,
      contra: this.state.password,
      confirmarContra: this.state.confirmPassword,
    };
    this.props.registerUser(user, this.props.history);
  };

  // Changes the input fields state value
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // open REGISTER modal box
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/register`;
    if (oldPath === newPath) oldPath = "/"; // handles case where we don't have oldPath

    // when a dialog is opened, this will change the url to newPath
    window.history.pushState(null, null, newPath);

    this.setState({
      oldPath,
      newPath,
    });
    this.props.openRegister();
  };

  // close REGISTER modal box
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    this.props.closeRegister();
    this.props.clearErrors();
  };

  // Closes REGISTER and Opens LOGIN
  switchToLogin = () => {
    this.handleClose();
    window.history.pushState(null, null, "/login");
    this.props.openLogin();
  };

  render() {
    const { email, username, password, confirmPassword } = this.state;
    const { classes, ui } = this.props;

    return (
      <Fragment>
        {/* <ToolTip title="Crear cuenta">
          <IconButton onClick={this.handleOpen}>Crear Cuenta</IconButton>
        </ToolTip> */}
        <Dialog
          open={ui.openRegister}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          className={classes.dialog}
        >
          <ToolTip title="Cerrar" className={classes.closebutton}>
            <IconButton onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </ToolTip>
          <DialogTitle className={classes.dialogTitle}>
            <img src={Susys} style={{ width: "50% " }} alt="Susy's" />
            <p style={{ margin: "0", fontSize: "1.5em" }}>Regístrate!</p>
          </DialogTitle>
          <DialogContent style={{ paddingTop: "0" }}>
            <form onSubmit={this.handleSubmit} className={classes.formStyle}>
              <TextField
                name="email"
                type="text"
                value={email}
                label="Correo electrónico"
                placeholder="Correo electrónico"
                error={ui.errors && ui.errors.email ? true : false}
                helperText={ui.errors && ui.errors.email ? ui.errors.email : ""}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                name="username"
                type="text"
                value={username}
                label="Nombre de usuario"
                placeholder="Nombre de usuario"
                error={ui.errors && ui.errors.usuario ? true : false}
                helperText={
                  ui.errors && ui.errors.usuario ? ui.errors.usuario : ""
                }
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                name="password"
                type="password"
                value={password}
                label="Contraseña"
                placeholder="Contraseña"
                error={ui.errors && ui.errors.contraseña ? true : false}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                label="Confirmar contraseña"
                placeholder="Confirmar contraseña"
                error={ui.errors && ui.errors.contraseña ? true : false}
                helperText={
                  ui.errors && ui.errors.contraseña ? ui.errors.contraseña : ""
                }
                className={classes.textField}
                onChange={this.handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={
                  email.length === 0 ||
                  username.length === 0 ||
                  password.length === 0 ||
                  confirmPassword.length === 0
                    ? true
                    : false
                }
              >
                Crear Cuenta
              </Button>
              {ui.errors ? (
                <p style={{ color: "red" }}>{ui.errors.error}</p>
              ) : null}
            </form>
            <div className={classes.switchContainer}>
              <p style={{ margin: "0" }}>Ya tienes una cuenta?</p>
              <Button
                color="primary"
                className={classes.switchButton}
                onClick={this.switchToLogin}
              >
                Entra
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

const mapActionsToProps = {
  clearErrors,
  registerUser,
  openLogin,
  openRegister,
  closeRegister,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Register))
);
