import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider.tsx";
import { Card } from "./components/ui/card.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Card>
            <App />
          </Card>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
