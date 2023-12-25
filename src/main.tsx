import ReactDOM from "react-dom/client";

import { Toaster } from "@/components/ui/toaster";

import { ThemeProvider } from "@/utils/contexts/theme-provider";
import { SidebarProvider } from "@/utils/contexts/sidebar";
import { TokenProvider } from "@/utils/contexts/token";

import App from "@/routes/index";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <App />
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  </TokenProvider>
);
