import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

export type AuthCredentials = {
  username: string;
  authToken: string;
};

export type AuthStatus = {
  credentials?: AuthCredentials;
  logout: () => void;
  login: (credentials: AuthCredentials) => void;
};

const AUTH_STORAGE_KEY = "auth";

const AuthContext = createContext<AuthStatus>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login() {},
});

export const useAuth = (): AuthStatus => {
  const status = useContext(AuthContext);
  return status;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [credentials, setCredentials] = useState(() => getCredentials());

  useEffect(() => {
    if (credentials !== undefined) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [credentials]);

  useEffect(() => {
    const cb = () => {
      // TODO only update when key == AUTH_STORAGE_KEY
      setCredentials(getCredentials());
    };

    window.addEventListener("storage", cb);
    return () => {
      window.removeEventListener("storage", cb);
    };
  }, []);

  const authStatus: AuthStatus = {
    credentials,
    login(args) {
      setCredentials(args);
    },
    logout() {
      setCredentials(undefined);
    },
  };

  return (
    <AuthContext.Provider value={authStatus}>{children}</AuthContext.Provider>
  );
};

const getCredentials = (): AuthCredentials | undefined => {
  const storage = localStorage.getItem(AUTH_STORAGE_KEY);
  if (storage === null) {
    return undefined;
  }

  // TODO use zod
  return JSON.parse(storage);
};

export const useProtectedRoute = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.credentials === undefined) {
      navigate("/login");
    }
  }, [auth.credentials]);

  return auth;
};
