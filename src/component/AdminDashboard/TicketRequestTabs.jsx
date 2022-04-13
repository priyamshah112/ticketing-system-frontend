import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TicketRequest from './TicketRequest';
import { getResponse } from '../../api/apiResponse';
import { apipaths } from '../../api/apiPaths';

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
  const [ticketRequest, setTicketRequest] = useState({})
  const [WeekelySeriesData, SetWeekelySeriesData] = useState([])
  const [WeekelyCatogoriesData, SetWeekelyCatogoriesData] = useState([])
  const [MonthlySeriesData, SetMonthlySeriesData] = useState([])
  const [MonthlyCatogoriesData, SetMonthlyCatogoriesData] = useState([])
  const [DailySeriesData, SetDailySeriesData] = useState([])
  const [DailyCatogoriesData, SetDailyCatogoriesData] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  useEffect(async () => {
    const { data } = await getResponse(apipaths.getTicketRequest);
    const { monthly = [], weekly = [], daily = 0 } = data?.data
    console.log("daily", data.data)
    monthly?.map((monthly) => {
      MonthlySeriesData.push(monthly.count)
      MonthlyCatogoriesData.push(monthly.Date)
    })
    SetMonthlySeriesData(MonthlySeriesData)
    SetMonthlyCatogoriesData(MonthlyCatogoriesData)

    weekly?.map((week) => {
      WeekelySeriesData.push(week.count)

    })
    SetWeekelySeriesData(WeekelySeriesData)
    SetWeekelyCatogoriesData(WeekelyCatogoriesData)

    DailySeriesData.push(daily)
    DailyCatogoriesData.push('Today')

    SetDailySeriesData(DailySeriesData)
    SetDailyCatogoriesData(DailyCatogoriesData)

    // console.log(DailySeriesData, WeekelyCatogoriesData)

  }, [])

  
  const getDayName = (data) => {
    let date = new Date(data);
    let day = date.toLocaleString('en-us', { weekday: 'long' });
    MonthlyCatogoriesData.push(...MonthlyCatogoriesData, day)
    SetMonthlyCatogoriesData(MonthlyCatogoriesData)
  }

  const getWeekDayName=(data)=>{
    let date = new Date(data);
    let day = date.toLocaleString('en-us', { weekday: 'long' });
    WeekelyCatogoriesData.push(...WeekelyCatogoriesData, day)
    SetWeekelyCatogoriesData(WeekelyCatogoriesData)
  }

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
          <TicketRequest seriesData={DailySeriesData} categories={DailyCatogoriesData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TicketRequest seriesData={WeekelySeriesData} categories={WeekelyCatogoriesData} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TicketRequest seriesData={MonthlySeriesData} categories={MonthlyCatogoriesData} />
        </TabPanel>
      </div>
    </div>
  );
}