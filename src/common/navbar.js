import React,{useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Typography,
  Button,
} from "@material-ui/core";
import {GlobalContext} from "../context/GlobalContext";
import {Link, navigate} from "@reach/router";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    background: "#1098F7",
    color: "#000000",
    justifyContent: "space-between",
    flexGrow:1
  },

  title: {
    color: "#000000",
  },
  buttonContainer: {
    margin:"0.5rem 1rem"
  },
  logoContainer: { margin: "0.5rem"},
  link:{textDecoration:'none'},
  

}));

const NavBar = (props) => {
  const {user, setUser,setToken} = useContext(GlobalContext)
  const classes = useStyles();
  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setUser("");
    setToken("");
    navigate(`/`);
  }
  return (
    <header className={classes.appBar}>
      <AppBar position="static"  >
          <div className={classes.container}> 
        <div className={classes.logoContainer}>
          {" "}
          <Typography variant="h6" className={classes.title}>
            Dev Communicator
          </Typography>{" "}
        </div>

        <div className={classes.buttonContainer}>
          {user ?   (   <Button onClick={handleLogout}> Logout </Button> ) 
          : (<Link className={classes.link} to="/">  <Button> Login </Button></Link>)}
          
          
         
        </div>
        </div>
      </AppBar>
    </header>
  );
};

export default NavBar;
