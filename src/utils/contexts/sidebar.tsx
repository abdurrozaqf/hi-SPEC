import {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
} from "react";

interface Context {
  sidebar: string;
  changeSidebar: (sidebar?: string) => void;
}

interface Props {
  children: ReactNode;
}

const contextValue: Context = {
  sidebar: "",
  changeSidebar: () => {},
};

const SidebarContext = createContext<Context>(contextValue);

export function SidebarProvider({ children }: Readonly<Props>) {
  const [sidebar, setSidebar] = useState(localStorage.getItem("sidebar") ?? "");

  const changeSidebar = useCallback(
    (sidebar?: string) => {
      const newSidebar = sidebar ?? "";
      setSidebar(newSidebar);
      if (sidebar) {
        localStorage.setItem("sidebar", newSidebar);
      } else {
        localStorage.removeItem("sidebar");
      }
    },
    [sidebar]
  );

  const sidebarContextValue = useMemo(
    () => ({
      sidebar,
      changeSidebar,
    }),
    [sidebar, changeSidebar]
  );

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("ERROR, useSidebar must be used within SidebarContext");
  }

  return context;
}
