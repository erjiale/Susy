import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { loginUser, clearErrors } from "../../redux/actions/userActions";
import {
  openLogin,
  openRegister,
  closeLogin,
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
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI Icons
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";

import Susys from "../../images/susys.png";

const styles = {
  closebutton: {
    position: "absolute",
    left: "90%",
  },
  dialogTitle: {
    textAlign: "center",
    paddingBottom: "0",
  },
  formStyle: {
    position: "relative ",
  },
  textField: {
    width: "60%",
    marginLeft: "20%",
    marginTop: "10px",
  },
  submitButton: {
    margin: "30px 0 30px 0",
    width: "60%",
    padding: "10px 0",
    fontWeight: "bold",
    left: "20%",
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

// const withMediaQuery = (...args) => (login) => (props) => {
//   const mediaQuery = useMediaQuery(...args);
//   return <login mediaQuery={mediaQuery} {...props} />;
// };

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      oldPath: "",
      newPath: "",
    };
  }

  componentDidMount() {
    if (window.location.pathname === "/login") this.handleOpen();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      usuario: this.state.username,
      contra: this.state.password,
    };

    this.props.loginUser(user, this.props.history);
  };

  // Changes the input fields state value
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // open LOGIN modal box
  handleOpen = () => {
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

  // close LOGIN modal box
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({
      username: "",
      password: "",
    });
    this.props.closeLogin();
    this.props.clearErrors();
  };

  // Closes LOGIN and Opens REGISTER
  switchToRegister = () => {
    this.handleClose();
    window.history.pushState(null, null, "/register");
    this.props.openRegister();
  };

  render() {
    const { username, password } = this.state;
    const {
      classes,
      ui,
      // mediaQuery,
    } = this.props;

    return (
      <Fragment>
        <ToolTip title="Iniciar Sesión">
          <IconButton onClick={this.handleOpen}>
            <PersonIcon />
          </IconButton>
        </ToolTip>

        <Dialog
          open={ui.openLogin}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          className={classes.dialog}
          // fullScreen={mediaQuery}
        >
          <ToolTip title="Cerrar" className={classes.closebutton}>
            <IconButton onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </ToolTip>
          <DialogTitle className={classes.dialogTitle}>
            <img src={Susys} style={{ width: "50%" }} alt="Susy's" />
            <p style={{ margin: "0", fontSize: "1.5em" }}>
              Bienvenido de vuelta!
            </p>
            {ui.registerSuccess ? (
              <p style={{ color: "green" }}>
                Ya está registrado. Ahora proceda a verificar su correo
                electrónico
              </p>
            ) : null}
            {ui.verifySuccess ? (
              <p style={{ color: "green" }}>Su cuenta ha sido verificada</p>
            ) : null}
          </DialogTitle>
          <DialogContent style={{ paddingTop: "0" }}>
            <form onSubmit={this.handleSubmit} className={classes.formStyle}>
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
                error={ui.errors && ui.errors.contra ? true : false}
                helperText={
                  ui.errors && ui.errors.contra ? ui.errors.contra : ""
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
                  username.length === 0 || password.length === 0 ? true : false
                }
              >
                Entrar
              </Button>
              {ui.errors ? (
                <p style={{ color: "red", textAlign: "center" }}>
                  {ui.errors.error}
                </p>
              ) : null}
            </form>
            <div className={classes.switchContainer}>
              <p style={{ margin: "0" }}>Eres nuevo?</p>
              <Button
                color="primary"
                className={classes.switchButton}
                onClick={this.switchToRegister}
              >
                Regístrate!
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

const mapActionsToProps = {
  loginUser,
  clearErrors,
  openLogin,
  openRegister,
  closeLogin,
};

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapActionsToProps
//   )(withStyles(styles)(withMediaQuery("(max-width: 770px)")(login)))
// );
export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))
);
