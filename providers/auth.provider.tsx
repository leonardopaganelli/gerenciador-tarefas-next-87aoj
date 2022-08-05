import {
  createContext,
  useState,
  useMemo,
  ReactElement,
  SetStateAction,
  Dispatch,
  useEffect,
  useRef,
} from "react";

import jwt from "jsonwebtoken";

interface UserAuthInterface {
  isLoggedIn: boolean;
  token: string;
  name: string;
}

interface TokenInterface {
  name: string;
}

interface AuthContextInterface {
  userAuth: UserAuthInterface;
  setUserAuth: Dispatch<SetStateAction<UserAuthInterface>>;
}

const AuthContext = createContext<AuthContextInterface>({
  userAuth: {
    isLoggedIn: false,
  },
} as AuthContextInterface);

const AuthProvider = ({
  children,
}: {
  children: ReactElement;
}): JSX.Element => {
  const effectRan = useRef(false);
  const [userAuth, setUserAuth] = useState<UserAuthInterface>({
    isLoggedIn: false,
  } as UserAuthInterface);
  const userAuthMemoized = useMemo(
    () => ({ userAuth, setUserAuth }),
    [userAuth]
  );

  useEffect(() => {
    if (effectRan.current === true) {
      if (userAuth.isLoggedIn && !localStorage.getItem("token")) {
        localStorage.setItem("token", userAuth.token);
      }
    }
  }, [userAuth.isLoggedIn, userAuth.token]);

  useEffect(() => {
    if (effectRan.current === true) {
      if (!userAuth.isLoggedIn && localStorage.getItem("token")) {
        const token = localStorage.getItem("token") as string;
        const decodedToken = jwt.decode(token) as TokenInterface;
        userAuthMemoized.setUserAuth({
          isLoggedIn: true,
          token,
          name: decodedToken.name,
        });
      }
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <AuthContext.Provider value={userAuthMemoized}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export type { AuthContextInterface };
