import { useState, createContext } from "react";
import { useInteractJS } from './hooks'

import "./App.css";
import { TimerState } from "./components/molecules/TimerState";
import { TimeSelect } from "./components/molecules/TimeSelect";
import { ShowTimer } from "./components/atoms/ShowTimer";
import { InteractBlock } from "./components/molecules/blocks/InteractBlock";

type TimeContextType = {
  totalSeconds: number;
  setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
};

export const TimeContext = createContext<TimeContextType>({
  totalSeconds: 0,
  setTotalSeconds: () => {},
});

function App() {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [showTimerColor, setShowTimerColor] = useState("black");
  const [totalSeconds, setTotalSeconds] = useState(0);

  // const interact = useInteractJS()
  // block
  const [blocks, setBlocks] = useState([<InteractBlock key={0} />]);

  const addBlock = () => {
    setBlocks([...blocks, <InteractBlock key={blocks.length} />]);  
  }

  return (
    <>
      <TimeContext.Provider value={{ totalSeconds, setTotalSeconds }}>
        <ShowTimer color={showTimerColor} />
        <TimeSelect setMinute={setMinute} setSecond={setSecond} />
        <TimerState
          minute={minute}
          second={second}
          setShowTimerColor={setShowTimerColor}
        />
      </TimeContext.Provider>
    {/*}
      <button onClick={() => interact.enable()}>有効化</button>
      <button onClick={() => interact.disable()}>無効化</button>
    */}
      <button onClick={addBlock}>ブロックを追加</button>
      <div style={{ width: '900px', height: '900px', backgroundColor: '#FFFDD0', position: 'relative' }}>
        {blocks}
      </div>
    </>
  );
}

export default App;
