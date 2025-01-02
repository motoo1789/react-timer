import { useState, createContext } from 'react';

import './App.css';
import { TimerState } from './components/molecules/TimerState';
import { TimeSelect } from './components/molecules/TimeSelect';
import { ShowTimer } from './components/atoms/ShowTimer';

const TimeContext = createContext(
  {
    minute : 0,
    second: 0,
  }
);

function App() {

  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  return (
    <>
      <TimeContext.Provider value={{minute, second}}>
        <ShowTimer />
        <TimeSelect setMinute={setMinute} setSecond={setSecond} />
        <TimerState />
      </TimeContext.Provider>
    </>
  );
}

export default App;
