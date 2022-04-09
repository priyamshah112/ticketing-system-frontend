import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TicketRequest from './TicketRequest';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TicketRequestTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="category__box category__box__ht__min">
    <div className="openCategory"><p className="category__title m-0">Ticket Request</p>
    </div>
    <div className="parentTabs">
      <AppBar position="static" className="ticketRequestWrapper">
        <Tabs
          variant="fullWidth"
          className="tabPanelTicketRequest"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Daily" href="/Daily" {...a11yProps(0)} />
          <LinkTab label="Week" href="/Week" {...a11yProps(1)} />
          <LinkTab label="Month" href="/Month" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TicketRequest priorityTickets={props?.priorityTickets?.data?.high} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TicketRequest priorityTickets={props?.priorityTickets?.data?.medium} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TicketRequest priorityTickets={props?.priorityTickets?.data?.low} />
      </TabPanel>
    </div>
    </div>
  );
}