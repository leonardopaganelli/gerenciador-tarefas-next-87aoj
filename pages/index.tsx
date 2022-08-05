import { useContext } from "react";
import type { NextPage } from "next";
import { Login } from "../containers/Login";
import {
  AuthProvider,
  AuthContext,
  AuthContextInterface,
} from "../providers/auth.provider";
import { Main } from "../containers/Main";

const Home: NextPage = () => {
  const {
    userAuth: { isLoggedIn },
  }: AuthContextInterface = useContext(AuthContext);
  return <>{isLoggedIn ? <Main /> : <Login />}</>;
};

const AppWithAuthProvider: NextPage = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};

export default AppWithAuthProvider;
