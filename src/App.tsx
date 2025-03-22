import { useState, createContext, useEffect } from "react";

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
  const [position, setPosition] = useState<{ [key: string]: { x: number; y: number } }>({
    'timer_1': { x: 50, y: 50 },
    'timer_2': { x: 100, y: 100 },
    'timer_3': { x: 200, y: 200 },
  });
  const [grouping, setGrouping] = useState<{ [key:string]: string[]}>({});


  const addBlock = () => {
    // setBlocks([...blocks, <InteractBlock key={blocks.length} />]);
  };


  /**
   * タイマーをタイマーにドロップした時の判定
   * タイマーがグループにドロップされた時の判定
   * @param {string} droppable : string
   * @param {string} droggables : object
   * @returns boolean
   */
  const canDropToTimerBlockArea = (droggables: object, droppble:string) => {
    return Object.keys(droggables).includes(droppble); 
  };

  /**
   * タイマーをタイマーにドロップした時の判定
   * @param {string} droppable : string
   * @param {string} droggables : object
   * @returns boolean
   */
    const canDropToTimerBlock = (droppbles: object, droggables:string) => {
      return Object.keys(droppbles).includes(droggables); 
    };

  /**
   * ドロップエリアにドロップされたか判定
   * @param {string} droppable 
   * @returns boolean
   */
  const canDropToDropArea = (droppble: string) => {
    return droppble === DROP_AREA;
  };

  /**
   * ドラッグされた要素がグループにあるか判定
   * @param {string} draggable
   * @returns boolean
   */
  const canGroupDrag = (draggable: string) => {
    return Object.keys(grouping).includes(draggable);
  }

  /**
   * ドラッグされた要素がグループにあるか判定
   * @param {string} draggable
   * @returns boolean | string
   */
  const canRemoveTimerBlock = (draggable: string) => {
    // for(const group of Object.values(grouping)) {
    //   if(group.includes(draggable)) return true
    // }
    for(const [key, value] of Object.entries(grouping)) {
      if(value.includes(draggable)) return key;
    }
    return false;
  }

  /**
   * droppableとdraggableが違う判定
   * @param {string} droppable 
   * @param {string} draggable
   * @returns boolean
   */
  const isDifferenceDroppableDraggable = (droppable: string, draggable: string) => {
    return droppable !== draggable;
  }

  // postionやgroupingの変更を監視
  useEffect(() => {
    console.log('position', position);
    console.log('grouping', grouping);
  }, [position, grouping]);

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
        // グループがドラッグされた時
        if (canGroupDrag(draggable) ) {
          const groupingBlock : string[] = grouping[draggable];
          console.log('group drag');
          setPosition((prev) => ({
            ...prev,
            [draggable]: {
              x: prev[draggable].x + event.delta.x,
              y: prev[draggable].y + event.delta.y,
            }}
          ));
          for( const block of groupingBlock) {
            setPosition((prev) => ({
              ...prev,
              [block]: {
                x: prev[block].x + event.delta.x,
                y: prev[block].y + event.delta.y,
              }}
            ));
          }
        }
        /* ブロック単体のエリア移動 */
        else if((canDropToDropArea(droppable) || draggable === droppable)&& canDropToTimerBlockArea(position, draggable)) {
          console.log("block drop to drop area");
          setPosition((prev) => ({
            ...prev,
            [draggable]: {
              x: prev[draggable].x + event.delta.x,
              y: prev[draggable].y + event.delta.y,
          }}));
          // グループの中にあるブロックが移動されたらグループから削除
          const hasKey = canRemoveTimerBlock(draggable);
          if(hasKey) {
            setGrouping((prev) => {
              console.log("Before:", prev);
              const { [hasKey]: _, ...rest } = prev;
              console.log("rest", rest)
              return rest;
            });
          }
        // 単体ブロックがブロックにドロップされた時グループに追加・作成
        } else if ( canDropToTimerBlock(position, draggable) && 
                    !canDropToDropArea(droppable) && 
                    isDifferenceDroppableDraggable(droppable, draggable)) { 
          console.log('grouping');
          const HIGHT = 50;
          // draggableの座標を更新
          setPosition((prev) => ({
            ...prev,
            [draggable]: {
              x: prev[droppable].x,
              y: prev[droppable].y + HIGHT,
            }
          }));
          // groupingの更新
          setGrouping((prev) => ({
            ...prev,
            [droppable] : prev[droppable] ? [...prev[droppable], draggable] : [draggable]
          }));
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