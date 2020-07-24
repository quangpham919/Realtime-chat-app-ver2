import React, {useState} from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserLogin from "./userLogin"
import AdminLogin from "./adminLogin"
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

function TabPanel (props) {
  const {children, value, index, ...other} = props;

  return (
    <div 
      role="tabpanel"
      hidden={value!==index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby= {`simple-tab-${index}`}
      {...other}>
        {value===index && (
            <Box >
                <Typography>{children}</Typography>
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
    'aria-controls': `simple-tabpanel-${index}`
  }
}


const useStyles = makeStyles( theme => ({
 root:{
  flexGrow:3
 },
 tab:{
   width:"100%",
 }
  })
);


const HomePage = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }
  return (<div className={classes.root}> 
  <Paper square className={classes.root}> 
  <Tabs variant="fullWidth" indicatorColor="secondary" centered textColor="secondary" className={classes.tabs} value = {value} onChange = {handleChange} aria-label = "simple tabs"  >
    <Tab
    label="Guest Login"
    icon={<QuestionAnswerIcon />}
    {...a11yProps(0)}
    />   
    <Tab  label="Admin Login" icon={<SupervisorAccountIcon />} {...a11yProps(1)} />
  </Tabs>  
  </Paper> 
  <TabPanel value={value} index={0}> 
    <UserLogin/>
  </TabPanel>
  <TabPanel value={value} index={1}> 
    <AdminLogin/>
  </TabPanel>
  </div>);
};

export default HomePage;
