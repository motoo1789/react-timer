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

  // const interact = useInteractJS()
  // block
  const [blocks, setBlocks] = useState([<InteractBlock key={0} />]);

  const addBlock = () => {
    // setBlocks([...blocks, <InteractBlock key={blocks.length} />]);
    setLeft(prev => prev + 10);
  };


  function handleDragEnd({over}) {
    setParent(over ? over.id : null);
  }

  const [parent, setParent] = useState(null);
  const draggable = (
    <BlockGroup id="draggable">
      Go ahead, drag me.
    </BlockGroup>
  );
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

      {/* <DndContext onDragEnd={handleDragEnd}> */}
      <DndContext onDragEnd={(event) => {
        console.log(event)
        setTop(event.delta.y);
        setLeft(event.delta.x);
      }}>
        {!parent ? draggable : null}
        <DnDKitArea id="droppable">
          
          {/* <BlockGroupDnD label={label} top={top} left={left}> */}
          <BlockGroupDnD x={left} y={top} id={0}>
            Go ahead, drag me.
          </BlockGroupDnD>
        </DnDKitArea>
      </DndContext>
    </>
  );
}

export default App;

