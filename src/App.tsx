import { useState, createContext, useEffect } from "react";
import { useSyncExternalStore } from 'react';

import "./App.css";
import { TimerState } from "./components/molecules/TimerState";
import { TimeSelect } from "./components/molecules/TimeSelect";
import { ShowTimer } from "./components/atoms/ShowTimer";

import { DndContext } from "@dnd-kit/core";
import { DnDKitArea } from "./components/molecules/DnDKitArea";
import { TimerBlock } from "./components/molecules/blocks/TimerBlock";
import { ParentChildUI, PositionUI, TimerUI } from "./type";
import { CombinedStore } from './application/CombinedStore';
import { DropBlock, DragBlock} from "./application/TimerBlocksApplicationService";

type TimeContextType = {
  totalSeconds: number;
  setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
};

export const TimeContext = createContext<TimeContextType>({
  totalSeconds: 0,
  setTotalSeconds: () => {},
});

type Timers = {
  [key: string]: TimerUI;
};


function App() {
  const initialTimers: Timers = {
    timer_1: {
      position: { top: 50, left: 50 },
      parentChild: { id: "timer_1", order: 0 },
    },
    timer_2: {
      position: { top: 50, left: 50 },
      parentChild: { id: "timer_1", order: 1 },
    },
    timer_3: {
      position: { top: 50, left: 50 },
      parentChild: { id: "timer_1", order: 2 },
    },
    timer_4: {
      position: { top: 50, left: 250 },
      parentChild: { id: "timer_4", order: 0 },
    },
  };

  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [showTimerColor, setShowTimerColor] = useState("black");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const timers = useSyncExternalStore(CombinedStore.subscribe, CombinedStore.getSnapshot);

  const addBlock = () => {
    // setBlocks([...blocks, <InteractBlock key={blocks.length} />]);
  };


  // postionやgroupingの変更を監視
  useEffect(() => {
    console.log("timers", timers);
  }, [timers]);

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

      <button onClick={addBlock}>ブロックを追加</button>

      <DndContext onDragMove={DragBlock.handler} onDragEnd={DropBlock.handler}>
        <DnDKitArea>
          {timers && Object.entries(timers).map(([key, timer]) => (
            <TimerBlock
              id={key}
              position={timer.position}
              parentChild={timer.parentChild}
            />
          ))}
        </DnDKitArea>
      </DndContext>
    </>
  );
}

export default App;
