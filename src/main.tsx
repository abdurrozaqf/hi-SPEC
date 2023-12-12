import ReactDOM from "react-dom/client";
import App from "./routes/index";
import "../src/styles/index.css";
import { ThemeProvider } from "../src/utils/contexts/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </>
);
