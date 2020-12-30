import React from "react";
import { Redirect } from "react-router-dom";
import { Profile } from "../../services/Models/User";

interface AuthPageProps {
  user?: Profile;
  children?: React.ReactNode;
}

function AuthPage(props: AuthPageProps) {
  const { user, children } = props;

  if (user && user.email !== "") {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return <Redirect to="/login" />;
}

export default AuthPage;
