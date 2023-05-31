import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from './image/blu.jpg';
import WorkIcon from './image/pur.jpg';
import BeachAccessIcon from './image/org.jpg';
import Divider from '@mui/material/Divider';
import { get_date, get_top_five_delay_route } from './axios'
import dataContext from './context';

export function ContextProvider({ children }) {

  const [value, setValue] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [displayRoute, setDisplayRoute] = React.useState(true)

  const updateValue = (newValue) => {
    setValue(newValue);
  }

  const updateValue2 = (newValue) => {
    setValue2(newValue);
  }

  const updateRows = (newData) => {
    setRows(newData);
  }

  const updateRoute = (isRoute) => {
    setDisplayRoute(isRoute);
  }

  return (
    <dataContext.Provider value={{ 
      value,  
      updateValue, 
      value2, 
      updateValue2, 
      rows, 
      updateRows,
      displayRoute,
      updateRoute,
      }}>
      {children}
    </dataContext.Provider>
  );
}

/**
 * function DateTimePickerValue
 * param {subtractMonth} set the default value of start date to be current date minus the number of months specified
 * param {label} the label of the DateTimePicker
 */

export function DateTimePickerValue({ subtractMonth }) {
  const { value, updateValue, value2, updateValue2 } = React.useContext(dataContext);

  React.useEffect(() => {
    updateValue(dayjs().subtract(subtractMonth, 'M'));
    updateValue2(dayjs().subtract(subtractMonth, 'M'));
  }, []);

  const formatDate = (date) => {
    return date.format('YYYY-MM-DDTHH:mm')
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          label='From Date'
          slotProps={{ textField: { size: 'small' } }}
          value={value}
          onChange={(newValue) => {
            updateValue(newValue);
            get_date({datetime: {
              From: formatDate(newValue),
              To: formatDate(value2)
            }});
          }}
        />
      </DemoContainer>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          label='To Date'
          slotProps={{ textField: { size: 'small' } }}
          value={value2}
          onChange={(newValue) => {
            updateValue2(newValue);
            get_date({datetime: {
              From: formatDate(value),
              To: formatDate(newValue)
            }});
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export function FixedContainer({ children }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', marginLeft: '-7%', width: '100%', height: '105.4%'}}>
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export function BasicTable() {
  const { value, value2, updateRows, rows } = React.useContext(dataContext);

  React.useEffect(() => {
    async function fetchContent() {
      const res = await get_top_five_delay_route();
      console.log(res);
      updateRows(res);
    }

    fetchContent();
  }, [value, value2]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 500 }} size={'small'} padding='normal' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Route ID</TableCell>
            <TableCell align="right">Average Delayed Time (min)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row[0]}
              selected={true}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell align="right">{row[0]}</TableCell>
              <TableCell align="right">{row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ControlledSwitches() {
  const {displayRoute, updateRoute} = React.useContext(dataContext);

  const handleChange = (event) => {
    updateRoute(event.target.checked);
  };

  return (
      <FormControlLabel 
        control={<Switch />} 
        label= { "Stop Station" }
        onChange={handleChange}
        checked={displayRoute}
      />
  );
}

export function BoxSx({children}) {
  return (
    <Box
      sx={{
        width: 300,
        height: 100,
        p: 0, 
        border: '1px solid grey',
      }}
    >
      {children}
    </Box>
  );
}

export function InsetDividers() {

  function MakeColor({ color }) {
    const circleStyle = {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: color,
    };
  
    return <div style={circleStyle}></div>;
  }
  const { rows } = React.useContext(dataContext);
  const route_name = rows.map((row) => row[0]);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem sx={{ paddingY: '3px' }}>
        <ListItemAvatar>
          <Avatar sx={{ width: '25px', height: '25px' }}>
            <MakeColor color= '#6699ff' />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary= {'Route name: ' + route_name[0]} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem sx={{ paddingY: '3px' }}>
        <ListItemAvatar>
          <Avatar sx={{ width: '25px', height: '25px' }}>
          <MakeColor color= '#ff6666' />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary= {'Route name: ' + route_name[1]} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem sx={{ paddingY: '3px' }}>
        <ListItemAvatar>
          <Avatar sx={{ width: '25px', height: '25px' }}>
          <MakeColor color= '#fc8403' />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary= {'Route name: ' + route_name[2]} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem sx={{ paddingY: '3px' }}>
        <ListItemAvatar>
          <Avatar sx={{ width: '25px', height: '25px' }}>
          <MakeColor color= '#ffff66' />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary= {'Route name: ' + route_name[3]} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem sx={{ paddingY: '3px' }}>
        <ListItemAvatar>
          <Avatar sx={{ width: '25px', height: '25px' }}>
          <MakeColor color= '#f803fc' />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary= {'Route name: ' + route_name[4]} />
      </ListItem>
    </List>
  );
}