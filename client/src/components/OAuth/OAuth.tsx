import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { UserService } from "../../services/UserService";

function OAuth({ history, location }: RouteComponentProps) {
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    UserService.oauth({
      state: params.get("state") || "",
      token: params.get("code") || "",
    }).then(() => history.push("/"));
  });

  return (
    <div className="col-6" style={{ marginTop: "20px" }}>
      <div className="alert alert-success mt-2" role="alert">
        Please wait. Logging you in...
      </div>
    </div>
  );
}

export default withRouter(OAuth);
