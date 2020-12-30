import React, { useState } from "react";
import { Validator } from "../../services/Validator";
import { UserService } from "../../services/UserService";
import "./Registration.css";
import { RegisterResult } from "../../services/Models/Register";
import { RouteComponentProps, withRouter } from "react-router-dom";

function RegistrationForm({ history }: RouteComponentProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editable, setEditable] = useState(true);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setEditable(false);

    if (validateData()) {
      setSuccessMessage("Creating your account...");
      UserService.registerUser(state)
        .then(registerDone)
        .finally(() => {
          setEditable(true);
        });
    } else {
      setEditable(true);
    }
  };

  const registerDone = (e: RegisterResult) => {
    if (!e.success && e.errorMessage) {
      setSuccessMessage(null);
      setErrorMessage(e.errorMessage);
      return;
    }

    setSuccessMessage("Account created. Logging you in!");

    UserService.loginUser({
      email: state.email,
      password: state.password,
      rememberPassword: true,
    }).then(() => history.push("/"));
  };

  const validateData = (): boolean => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (state.firstName.length === 0) {
      setErrorMessage("First name is required");
      return false;
    }

    if (state.lastName.length === 0) {
      setErrorMessage("Last name is required");
      return false;
    }

    if (!Validator.validateEmail(state.email)) {
      setErrorMessage("Invalid email address");
      return false;
    }

    if (state.password.length < 6) {
      setErrorMessage("Password need to at least 6 characters");
      return false;
    }

    if (state.confirmPassword !== state.password) {
      setErrorMessage("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleClearClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="card col-6 login-card">
      <form>
        <div className="form-group text-left">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter First Name"
            onChange={handleChange}
            value={state.firstName}
            readOnly={!editable}
          />
        </div>

        <div className="form-group text-left">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter Last Name"
            onChange={handleChange}
            value={state.lastName}
            readOnly={!editable}
          />
        </div>

        <div className="form-group text-left">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChange}
            value={state.email}
            readOnly={!editable}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group text-left">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={state.password}
            readOnly={!editable}
          />
        </div>

        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={state.confirmPassword}
            readOnly={!editable}
          />
        </div>

        <div className="hv-center">
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginRight: "5px", width: "100px" }}
            onClick={handleClearClick}
            disabled={!editable}
          >
            Clear
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: "5px", width: "100px" }}
            onClick={handleSubmitClick}
            disabled={!editable}
          >
            Register
          </button>
        </div>
      </form>

      <div
        className="alert alert-success mt-2"
        style={{ display: successMessage ? "block" : "none" }}
        role="alert"
      >
        {successMessage}
      </div>

      <div
        className="alert alert-danger mt-2"
        style={{ display: errorMessage ? "block" : "none" }}
        role="alert"
      >
        {errorMessage}
      </div>

      <div className="mt-2" style={{ paddingBottom: "5px" }}>
        <span>Already have an account? </span>
        <span className="login-text" onClick={() => history.push("/login")}>
          Login here
        </span>
      </div>
    </div>
  );
}

export default withRouter(RegistrationForm);
