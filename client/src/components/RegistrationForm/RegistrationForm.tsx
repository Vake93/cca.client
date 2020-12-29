import React, { useState } from "react";
import { Validator } from "../../services/Validator";
import { UserService } from "../../services/UserService";
import "./RegistrationForm.css";
import { RegisterResult } from "../../services/Models/Register";

interface RegistrationFormProps {
  updateMessage: (message: string | null) => void;
}

function RegistrationForm(props: RegistrationFormProps) {
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
    props.updateMessage(null);
    setEditable(false);

    if (validateData()) {
      UserService.registerUser(state)
        .then(registerDone)
        .finally(() => setEditable(true));
    } else {
      setEditable(true);
    }
  };

  const registerDone = (e: RegisterResult) => {
    if (!e.success && e.errorMessage) {
      props.updateMessage(e.errorMessage);
      return;
    }

    UserService.loginUser({
      email: state.email,
      password: state.password,
      rememberPassword: true,
    });
  };

  const validateData = (): boolean => {
    if (state.firstName.length === 0) {
      props.updateMessage("First name is required");
      return false;
    }

    if (state.lastName.length === 0) {
      props.updateMessage("Last name is required");
      return false;
    }

    if (!Validator.validateEmail(state.email)) {
      props.updateMessage("Invalid email address");
      return false;
    }

    if (state.password.length < 6) {
      props.updateMessage("Password need to at least 6 characters");
      return false;
    }

    if (state.confirmPassword !== state.password) {
      props.updateMessage("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleCancelClick = (
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
            onClick={handleCancelClick}
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
    </div>
  );
}

export default RegistrationForm;
