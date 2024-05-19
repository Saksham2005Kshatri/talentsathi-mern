import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import SignupScreen from "./screens/SignupScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import UpdateScreen from "./screens/UpdateScreen.js";
import PrivateRoute from "./components/PrivateRoute.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* home page -> index */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/profile/update" element={<UpdateScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
