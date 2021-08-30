import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import Routes from "./Routes";
import { AuthProvider } from "./Context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
