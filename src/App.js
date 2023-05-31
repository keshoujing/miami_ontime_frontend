import UF_logo from './image/university-of-florida-logo-532x336-1.webp';
import lab_logo from './image/Lab logo.jpg';
import { DateTimePickerValue, FixedContainer, BasicTable, ControlledSwitches, BoxSx, ContextProvider, InsetDividers } from './mui';
import { LineChart, BarChart } from './chart';
import Map from './map';

import './App.css';

function App() {
  return (
    <div className='screen-layout'>
      <ContextProvider>
        <div className='column-layout'>
          <div className="logo-container">
            <img src={UF_logo} alt="UF_logo" className="UF_logo" />
            <img src={lab_logo} alt="lab_logo" className="Lab_logo" />
          </div>
          <FixedContainer>
            <h1 className="header-text">Miami Bus On Time</h1>
            <h3 className="text">Select date range:</h3>
            <div className="date-time-window">
              <DateTimePickerValue subtractMonth={1} />
            </div>
            <h3 className="text2">Top 5 most serious delay routes:</h3>
            <div className='table'><BasicTable /></div>
            <h3 className='text3'>Bar chart:</h3>
            <div className='bar-chart'><BarChart /></div>
          </FixedContainer>
        </div>
        <Map />
        <div>
          <div className='switch'><ControlledSwitches /></div>
          <InsetDividers />
          <div className='line-chart'><LineChart /></div>
          <div className='box'>
            {/* <BoxSx word="Average delay time: 1.213214 min" /> */}
            <BoxSx>
              <h3 style={{ width: "180px", textAlign: 'center', marginLeft: '60px'}}>Average delay time: 1.213214 min</h3>
            </BoxSx>
          </div>
        </div>
      </ContextProvider>
    </div>
  );
}

export default App;
