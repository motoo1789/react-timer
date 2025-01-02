import { useState } from 'react';

import './App.css';
import { TimerState } from './components/molecules/TimerState';
import { TimeSelect } from './components/molecules/TimeSelect';

function App() {
  return <>
    <TimeSelect />
    <TimerState />
  
  </>;
}

export default App;
