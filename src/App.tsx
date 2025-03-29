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

type Grouping = {
  order: number,
  id: string
}
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
  const [grouping, setGrouping] = useState<{ [key: string]: Grouping[] }>({});
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);

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
      if(value.some(group => group.id === draggable)) return key;
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

  /**
   * ドラッグハンドラ
   */
  const handleDrag = (event) => {
    console.log('drag drag');
    const draggable: string = event.active?.id as string;

    // グループがドラッグされた時
    if (canGroupDrag(draggable) ) {
      const groupingBlock : Grouping[] = grouping[draggable];
      console.log('group drag');
      let changeX = event.delta.x - deltaX;
      let changeY = event.delta.y - deltaY;

      setDeltaX(event.delta.x);
      setDeltaY(event.delta.y)
      for( const block of groupingBlock) {
        setPosition((prev) => ({
          ...prev,
          [block.id]: {
            x: prev[block.id].x + changeX,
            y: prev[block.id].y + changeY,
          }}
        ));
      }
    } 
  }
  /**
   * ドロップハンドラ
   */
  const handleDragEnd = (event) =>{
    setDeltaX(0);
    setDeltaY(0);

    const droppable: string = event.over?.id as string;
    const draggable: string = event.active?.id as string;
    // グループがドラッグされた時
    if (canGroupDrag(draggable) ) {
      console.log('group drag');
      setPosition((prev) => ({
        ...prev,
        [draggable]: {
          x: prev[draggable].x + event.delta.x,
          y: prev[draggable].y + event.delta.y,
        }}
      ));
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
      // グループを完全に解除するようになってる
      if(hasKey) {
        if(grouping[hasKey].length > 1) {
          let sortedGroup: Grouping[] = [];
          setGrouping((prev) => {
            const releaseBlockArray = prev[hasKey];
            // filterでdoraggableをグループから外してからorderの抜け番を詰める
            sortedGroup = releaseBlockArray.filter(group  => group.id !== draggable)
                                           .map((group, index) => {
                                             return {
                                               ...group,
                                               order: index + 1, // orderを1から始まるように再設定
                                             };
                                           });
            // newGroupの中のorderで抜け板を詰めたい
            // sortedGroup = newGroup.map((group, index) => {
            //   console.log('group',group);
            //   console.log(`Index: ${index}`); // indexを表示
            //   return {
            //     ...group,
            //     order: index + 1, // orderを1から始まるように再設定
            //   };
            // });
            const topPositionY : number = position[hasKey].y
            // groupの中で今何板目なのかがほしいのでここでpositionを決める
            for(const group of sortedGroup) {
              setPosition((prev) => ({
                  ...prev,
                  [group.id]: { x: prev[group.id].x, y: topPositionY * (group.order + 1) }
              }))
            }

            const { [hasKey]: _, ...rest } = prev;
            return {
              ...rest,
              [hasKey]: sortedGroup,
            };
          });

        } else {          
          setGrouping((prev) => {
            const { [hasKey]: _, ...rest } = prev;
            return rest;
          });
        }
      }
    // 単体ブロックがブロックにドロップされた時グループに追加・作成
    } else if ( canDropToTimerBlock(position, draggable) && 
                !canDropToDropArea(droppable) && 
                isDifferenceDroppableDraggable(droppable, draggable)) { 
      console.log('grouping');
      const HIGHT = 50;
      // stateは即時反映ではないのでgroupの長さは別で考える
      const groupLength = grouping[droppable] ? (grouping[droppable].length + 1) : 1
      // groupingの更新
      setGrouping((prev) => {
        const newGroup : Grouping = {
          order: prev[droppable] ? prev[droppable].length + 1 : 1,
          id: draggable
        }
        return { 
          ...prev,
          [droppable] : prev[droppable] ? [...prev[droppable], newGroup] : [newGroup]
        }
      });

      // draggableの座標を更新
      setPosition((prev) => ({
        ...prev,
        [draggable]: {
          x: prev[droppable].x,
          y: prev[droppable].y + groupLength * HIGHT,
        }
      }));
    }
  }

  // postionやgroupingの変更を監視
  useEffect(() => {
    // console.log('deltaX', deltaX);
    // console.log('deltaY', deltaY);
    // console.log('position', position);
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

      <DndContext onDragMove={handleDrag} onDragEnd={handleDragEnd} >
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