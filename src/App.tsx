import { useState, createContext } from "react";

import "./App.css";
import { TimerState } from "./components/molecules/TimerState";
import { TimeSelect } from "./components/molecules/TimeSelect";
import { ShowTimer } from "./components/atoms/ShowTimer";
import { DndContext } from "@dnd-kit/core";
import { DnDKitArea } from "./components/molecules/DnDKitArea";
import { BlockGroupDnD } from "./components/molecules/blocks/BlockGroupDnD";

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
  const DROP_AREA = "DROP_AREA";

  const addBlock = () => {
    // setBlocks([...blocks, <InteractBlock key={blocks.length} />]);

  };

  /**
   * タイマーをタイマーにドロップした時の判定
   * タイマーがグループにドロップされた時の判定
   * @param droppable : string
   * @param droggables : object
   * @returns boolean
   */
  const canDropToTimerBlockArea = (droggables: object, droppble:string) => {
    return Object.keys(droggables).includes(droppble); 
  };

  /**
   * ドロップエリアにドロップされたか判定
   * @param droppable 
   * @returns boolean
   */
  const canDropToDropArea = (droppble: string) => {
    return droppble === DROP_AREA;
  };

  

  const [parent, setParent] = useState(null);
  const [position, setPosition] = useState({
    'timer_1': { x: 50, y: 50 },
    'timer_2': { x: 50, y: 50 },
    'timer_3': { x: 150, y: 150 },
  });

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

      <DndContext onDragEnd={(event) => {
        if(canDropToDropArea(event.over?.id as string) && canDropToTimerBlockArea(position,event.active?.id as string)) {
          setPosition((prev) => ({
            ...prev,
            timer_1: {
              x: prev.timer_1.x + event.delta.x,
              y: prev.timer_1.y + event.delta.y,
            }}));
          }}
        }>
        <DnDKitArea >
          <BlockGroupDnD id={'timer_1'} position={position.timer_1} />
        </DnDKitArea>
      </DndContext>
    </>
  );
}

export default App;

