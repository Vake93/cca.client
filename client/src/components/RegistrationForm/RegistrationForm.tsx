import React, { useState } from "react";

function RegistrationForm() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter First Name"
            onChange={handleChange}
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
          />
        </div>

        <button
          type="submit"
          className="btn btn-secondary"
          style={{ marginRight: "5px" }}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "5px" }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
