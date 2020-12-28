import React, { useState } from "react";
import "./RegistrationForm.css";

interface RegistrationFormProps {
  updateMessage: (message: string | null) => void;
}

function RegistrationForm(props: RegistrationFormProps) {
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
    if (state.confirmPassword !== state.password) {
      props.updateMessage("Passwords do not match");
    }
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
          />
        </div>

        <div className="hv-center">
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginRight: "5px", width: "100px" }}
            onClick={handleCancelClick}
          >
            Clear
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: "5px", width: "100px" }}
            onClick={handleSubmitClick}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
