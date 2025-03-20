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
   * タイマーをタイマーにドロップした時の判定
   * @param droppable : string
   * @param droggables : object
   * @returns boolean
   */
    const canDropToTimerBlock = (droppbles: object, droggables:string) => {
      return Object.keys(droppbles).includes(droggables); 
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
  const [position, setPosition] = useState<{ [key: string]: { x: number; y: number } }>({
    'timer_1': { x: 50, y: 50 },
    'timer_2': { x: 100, y: 100 },
    'timer_3': { x: 150, y: 150 },
  });
  const [grouping, setGrouping] = useState({
    timer_1: ['timer_1'],
    timer_3: ['timer_3'],
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
        const droppable: string = event.over?.id as string;
        const draggable: string = event.active?.id as string;
        /* エリアの移動 */
        // if(canDropToDropArea(droppable) && canDropToTimerBlockArea(position, draggable)) {
        //   setPosition((prev) => ({
        //     ...prev,
        //     timer_1: {
        //       x: prev.timer_1.x + event.delta.x,
        //       y: prev.timer_1.y + event.delta.y,
        //     }}));
        // } else 
        if (canDropToTimerBlock(position, draggable) && !canDropToDropArea(droppable))  {
          console.log('grouping');
          console.log('droppable',droppable);
          console.log('draggable',draggable);
          console.log('grouping[droppable]',position[droppable]);
          console.log('grouping[droppable]',position[draggable]);
          let test = 0;
          // draggableの座標を更新
          setPosition((prev) => ( test = prev[droppable].y,console.log(draggable) , {
            ...prev,
            [draggable]: {
              x: prev[droppable].x,
              y: prev[droppable].y + 50,

              // x: prev[updateTimer].x + event.delta.x,
              // y: prev[updateTimer].y + event.delta.y,
            },
          }));
          console.log(position);
          console.log('test',test);
        }
      }}>
        <DnDKitArea >
          <BlockGroupDnD id={'timer_1'} position={position.timer_1} />
          <BlockGroupDnD id={'timer_2'} position={position.timer_2} />
          <BlockGroupDnD id={'timer_3'} position={position.timer_3} />
        </DnDKitArea>
      </DndContext>
    </>
  );
}

export default App;


// draggableをdroppableの下に来るようにdndしたいです
// たとえば、timer_1をtimer_2にドロップするとtimer_2の下にtimer_1が表示されるようにしたいです。
// 現在のコードだとtimer_1をtimer_2にドロップするとtimer_1の座標がtimer_2の上にくるようになります。