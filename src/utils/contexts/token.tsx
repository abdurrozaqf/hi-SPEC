import {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

import { useToast } from "@/components/ui/use-toast";

import axiosWithConfig, { setAxiosConfig } from "@/utils/apis/axiosWithConfig";
import { User, tokenUser, getDetailUser } from "@/utils/apis/users";

interface Context {
  token: string;
  user: Partial<tokenUser>;
  changeToken: (token?: string) => void;
  changeUserID: (userID?: string) => void;
}

interface Props {
  children: ReactNode;
}

const contextValue = {
  token: "",
  user: {},
  changeToken: () => {},
  changeUserID: () => {},
};

const TokenContext = createContext<Context>(contextValue);

export function TokenProvider({ children }: Readonly<Props>) {
  const { toast } = useToast();

  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [userID, setUserID] = useState(localStorage.getItem("userID") ?? "");
  const [user, setUser] = useState<Partial<tokenUser>>({});

  useEffect(() => {
    setAxiosConfig(token);
    token !== "" && fetchProfile();
  }, [token]);

  axiosWithConfig.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        changeToken();
        changeUserID();
      }

      return Promise.reject(error);
    }
  );

  const fetchProfile = useCallback(async () => {
    try {
      const result = await getDetailUser(userID);
      setUser(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }, [token]); // biar gak refresh di tambah parameter di dalam kurung siku sebagai tanda perubahan di user dia akan menjalankan functionnya kembali

  const changeToken = useCallback(
    (token?: string) => {
      const newToken = token ?? "";

      setToken(newToken);

      if (token) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");

        setUser({});
      }
    },
    [token]
  );

  const changeUserID = useCallback(
    (userID?: string) => {
      const newUserID = userID ?? "";
      setUserID(newUserID);
      if (userID) {
        localStorage.setItem("userID", newUserID);
      } else {
        localStorage.removeItem("userID");
        setUser({});
      }
    },
    [userID]
  );

  const tokenContextValue = useMemo(
    () => ({
      token,
      user,
      userID,
      changeToken,
      changeUserID,
    }),
    [token, user, userID, changeToken, changeUserID]
  );

  return (
    <TokenContext.Provider value={tokenContextValue}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error("ERROR, useToken must be used within TokenContext");
  }

  return context;
}
