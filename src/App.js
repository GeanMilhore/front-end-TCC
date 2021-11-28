import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import Routes from "./Routes";
import { UserStorage } from "./UserContext";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const App = () => {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <Routes />
      </UserStorage>
    </BrowserRouter>
  );
};

export default App;