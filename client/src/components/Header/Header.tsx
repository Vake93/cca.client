import { RouteComponentProps, withRouter } from "react-router-dom";
import { Profile } from "../../services/Models/User";
import { UserService } from "../../services/UserService";

interface HeaderProps extends RouteComponentProps {
  user?: Profile;
}

function Header({ location, history, user }: HeaderProps) {
  const getTitle = () => {
    if (location.pathname === "/login") {
      return "CCA Login";
    }

    if (location.pathname === "/register") {
      return "CCA Register";
    }

    if (location.pathname === "/oauth") {
      return "CCA Login";
    }

    if (location.pathname === "/new-event") {
      return "New Event";
    }

    if (location.pathname === "/") {
      return "CCA Events";
    }

    return "CCA Project";
  };

  const logoutUser = () => {
    UserService.logoutUser();
    UserService.userStateUpdate();
    history.push("/login");
  };

  const renderLogout = () => {
    if (user && user.email !== "") {
      return (
        <div className="ml-auto">
          <button
            className="btn btn-warning"
            style={{ height: "40px", width: "100px" }}
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
