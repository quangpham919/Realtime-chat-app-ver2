import React, {useState,useEffect,useContext} from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserLogin from "./userLogin"
import AdminLogin from "./adminLogin"
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {GlobalContext} from "../context/GlobalContext";
import NavBar from "../common/navbar";

const useStyles = makeStyles( theme => ({
  root:{
    backgroundColor:"#f3fbfb",
    display:"flex",
    flexDirection:"column",
  },
  tab:{
    width:"100%",
    backgroundColor:"#FFFF",
  },
  tabContent:{
    backgroundColor:"#f3fbfb",
    width:"100%",
    flexGrow:"1"
  }
   })
 );
 
function TabPanel (props) {
  const {children, value, index, ...other} = props;
  const classes = useStyles();
  return (
    <div 
      role="tabpanel"
      className={classes.tabContent}
      hidden={value!==index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby= {`simple-tab-${index}`}
      {...other}>
        {value===index && (
            <Box>
                <Typography component="div">{children}</Typography>
            </Box>
        )}
      </div>

  )
}

TabPanel.propTypes={
  children: PropTypes.node,
  index : PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id:`simple-tab-${index}`,
    "aria-controls": `simple-tabPanel-${index}`,
  }
}




const HomePage = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const {setToken,setUser} = useContext(GlobalContext)
  useEffect(()=>{
    setToken("");
    setUser("");
    localStorage.removeItem("token");
    //eslint-disable-next-line
  },[])
  const handleChange = (e, newValue) => {
    setValue(newValue);
  }
  return (
  <div className={classes.root}> 
  <div> <NavBar /> </div>
  <div>
  <Paper square className={classes.root}> 
  <Tabs variant="fullWidth" indicatorColor="secondary" centered textColor="secondary" className={classes.tabs} value = {value} onChange = {handleChange} aria-label = "simple tabs"  >
    <Tab
    label="Guest Login"
    icon={<QuestionAnswerIcon />}
    role="button"
    {...a11yProps(0)}
    />   
    <Tab  label="Admin Login" role="button" icon={<SupervisorAccountIcon />} {...a11yProps(1)} />
  </Tabs>  
  </Paper>  
  </div>
  <div>
  <TabPanel value={value} index={0}> 
    <UserLogin/>
  </TabPanel>
  <TabPanel value={value} index={1}> 
    <AdminLogin/>
  </TabPanel> 
  </div>
  
  </div>);
};

export default HomePage;
