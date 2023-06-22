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
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import { GlobalLoading, showLoading } from 'react-global-loading';
import { get_top_five_delay_route } from './axios'
import dataContext from './context';

export function ContextProvider({ children }) {

  const [value, setValue] = React.useState(dayjs().subtract(1, 'M'));
  const [value2, setValue2] = React.useState(dayjs());
  const [rows, setRows] = React.useState([]);
  const [displayRoute, setDisplayRoute] = React.useState(true)
  const [loading, setLoading] = React.useState(false);

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

  const updateLoading = (isLoading) => {
    setLoading(isLoading);
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
      loading,
      updateLoading,
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

export function DateTimePickerValue() {
  const { value, updateValue, value2, updateValue2 } = React.useContext(dataContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          label='From Date'
          slotProps={{ textField: { size: 'small' } }}
          value={value}
          onChange={(newValue) => {
            updateValue(newValue);
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
        <Box sx={{ bgcolor: '#cfe8fc', marginTop: '5%', marginLeft: '-7%', width: '100%', height: '105.4%'}}>
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export function BasicTable() {
  const { value, value2, updateRows, rows, loading } = React.useContext(dataContext);

  React.useEffect(() => {
    async function fetchContent(timestamp) {
      await get_top_five_delay_route(timestamp).then((response) => updateRows(response));
    }
    const timestamp = {
      fromDate: value.format('YYYY-MM-DD'),
      toDate: value2.format('YYYY-MM-DD'),
      fromTime: value.format('HH:mm:ss'),
      toTime: value2.format('HH:mm:ss'),
    }
    showLoading(true);
    fetchContent(timestamp);
  }, [loading]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 500 }} size={'small'} padding='normal' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">RouteID</TableCell>
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
              <TableCell align="right">{parseFloat(row[1]).toFixed(2)}</TableCell>
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

export function BasicButtons() {
  const { loading, updateLoading } = React.useContext(dataContext);

  const handleClick = () => {
    updateLoading(!loading);
  };

  return (
    <div>
      <GlobalLoading />
      <Box sx={{ '& > button': { m: 1 } }}>
        <LoadingButton
            size="medium"
            onClick={handleClick}
            loading={false}
            loadingIndicator="Loading…"
            variant="outlined"
          >
            <span>Search</span>
          </LoadingButton>
      </Box>
    </div>

  );
}

export function AVGDelay() {
  const { rows } = React.useContext(dataContext);
  let avgDelay = 0;
  if (rows.length > 0) { rows.forEach((row) => { avgDelay += row[1] }); }
  return (
    <h3 style={{ width: "180px", textAlign: 'center', marginLeft: '60px'}}>Average delay time: { parseFloat(avgDelay / rows.length).toFixed(2) } min</h3>
  )
}