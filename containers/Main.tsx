import React, { useContext } from "react";
import { AuthContext, AuthContextInterface } from "../providers/auth.provider";

export const Main = () => {
  const { userAuth }: AuthContextInterface = useContext(AuthContext);

  return <div>Test - {userAuth.name}</div>;
};
