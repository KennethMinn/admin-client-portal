import { MantineProvider, createTheme } from "@mantine/core";
import "./App.css";
import "@mantine/dates/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./languages/translate";
import Element from "./lib/router/Router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const theme = createTheme({
  colors: {},
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <BrowserRouter>
          <Element />
          <ToastContainer />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
