import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import createStore from "./store/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Spin from "./assets/images/spin.svg";

const TaskPage = lazy(() => import("./pages/TaskPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#FF3152",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {},
    },
    MuiOutlinedInput: {
      root: {
        "&$focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.8)",
            borderWidth: "1px",
          },
        },
      },
    },
    MuiInputLabel: {
      root: {
        "&$focused": {
          color: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
    MuiButton: {
      text: {
        textTransform: "capitalize",
      },
      contained: {
        textTransform: "capitalize",
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.24443280730260852) 0%, rgba(255,49,82,0.19681375968356096) 100%)",
        },
      },
    },
  },
});

const appStore = createStore();

const fallbackContent = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <img src={Spin} alt="spin" />
  </div>
);

function App() {
  return (
    <Provider store={appStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={fallbackContent}>
          <Switch>
            <Route path="/task" component={TaskPage}></Route>
            <Route path="/" component={HomePage}></Route>
          </Switch>
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
