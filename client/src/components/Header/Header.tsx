import { RouteComponentProps, withRouter } from "react-router-dom";
import { UserService } from "../../services/UserService";

function Header({ location, history }: RouteComponentProps) {
  const getTitle = () => {
    if (location.pathname === "/login") {
      return "Login";
    }

    if (location.pathname === "/register") {
      return "Register";
    }

    if (location.pathname === "/oauth") {
      return "Login";
    }

    return "CCA Project Home";
  };

  const logoutUser = () => {
    UserService.logoutUser();
    history.push("/login")
  }

  const renderLogout = () => {
    if (UserService.loggedInUser()) {
      return (
        <div className="ml-auto">
          <button
            className="btn btn-danger"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      );
    }
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="row col-12 d-flex text-white">
        <span className="h3">{getTitle()}</span>
        {renderLogout()}
      </div>
    </nav>
  );
}

export default withRouter(Header);
