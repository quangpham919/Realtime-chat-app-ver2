import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import NavBar from "./common/navbar";
import HomePage from "./pages/HomePage"
import {GlobalContextProvider} from "./context/GlobalContext"

function App() {
  return (
    <GlobalContextProvider>
    <div className="app-container">
      <NavBar />
      <Router>
        <HomePage path="/" />
        {/* <ChatPage path="/chat"/> */}
      </Router>  
    </div>
    </GlobalContextProvider>
  )
}

export default App;
