import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import {CssBaseline} from "@material-ui/core"

import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import {GlobalContextProvider} from "./context/GlobalContext"

function App() {
  return (
    <GlobalContextProvider>
    <div className="app-container">
    <CssBaseline />
      <Router>
        <HomePage path="/" />
        <ChatPage path="/chat"/>
      </Router>  
    </div>
    </GlobalContextProvider>
  )
}

export default App;
