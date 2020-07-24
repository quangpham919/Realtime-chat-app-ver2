import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Typography,
  Button,
} from "@material-ui/core";
import {Link} from "@reach/router";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    background: "#1098F7",
    color: "#000000",
    justifyContent: "space-between",
  },

  title: {
    color: "#000000",
  },
  buttonContainer: {
    margin:"0.5rem 1rem"
  },
  logoContainer: { margin: "0.5rem"}
   
}));

const NavBar = (props) => {
  const classes = useStyles();
  return (
    <header>
      <AppBar position="static" >
          <div className={classes.container}> 
        <div className={classes.logoContainer}>
          {" "}
          <Typography variant="h6" className={classes.title}>
            Dev Communicator
          </Typography>{" "}
        </div>

        <div className={classes.buttonContainer}>
          {" "}
          <Link to="/">  <Button> Login </Button>{" "} </Link>
         
        </div>
        </div>
      </AppBar>
    </header>
  );
};

export default NavBar;
