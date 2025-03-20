import { useState, createContext } from "react";

import "./App.css";
import { TimerState } from "./components/molecules/TimerState";
import { TimeSelect } from "./components/molecules/TimeSelect";
import { ShowTimer } from "./components/atoms/ShowTimer";
import { InteractBlock } from "./components/molecules/blocks/InteractBlock";
import { DndContext } from "@dnd-kit/core";
import { DnDKitArea } from "./components/molecules/DnDKitArea";
import { BlockGroup } from "./components/molecules/blocks/BlockGroup";
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

  // const interact = useInteractJS()
  // block
  const [blocks, setBlocks] = useState([<InteractBlock key={0} />]);

  // テスト
  const [objects, setObjects] = useState({
    timer_1: { x: 0, y: 0 },
    timer_2: { x: 50, y: 50 },
    timer_3: { x: 150, y: 150 },
  });

  const addBlock = () => {
    // setBlocks([...blocks, <InteractBlock key={blocks.length} />]);
    setLeft(prev => prev + 10);
  };

  /**
   * タイマーをタイマーにドロップした時の判定
   * タイマーがグループにドロップされた時の判定
   * @param droppable : string
   * @param droggables : object
   * @returns boolean
   */
  const canDropToTimerBlockArea = (droggables: object, droppble: string) => {
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
    'timer_1': { x: 50, y: 50 }
  });
  // const draggable = (
  //   <BlockGroup id="draggable">
  //     Go ahead, drag me.
  //   </BlockGroup>
  // );
  const label = "test";
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
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
        if(event.over?.id === "droppable" && event.active?.id === "draggable") {
          setPosition((prev) => ({
            ...prev,
            timer_1: {
              x: prev.timer_1.x + event.delta.x,
              y: prev.timer_1.y + event.delta.y,
            }}));
          }}
        }>
        {/* {!parent ? draggable : null} */}
        <DnDKitArea >
          <BlockGroupDnD position={position.timer_1} />
        </DnDKitArea>
      </DndContext>
    </>
  );
}

export default App;

