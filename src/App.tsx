import { useState, createContext, useEffect } from "react";

import "./App.css";
import { TimerState } from "./components/molecules/TimerState";
import { TimeSelect } from "./components/molecules/TimeSelect";
import { ShowTimer } from "./components/atoms/ShowTimer";

import { DndContext } from "@dnd-kit/core";
import { DnDKitArea } from "./components/molecules/DnDKitArea";
import { BlockGroupDnD } from "./components/molecules/blocks/BlockGroupDnD";
import { TimerBlock } from "./components/molecules/blocks/TimerBlock";
import { ParentChild, Position, Timer } from "./type";


// type Timers = Record<Timer>;


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

type Timers = {
  [key: string]: Timer;
};
function App() {
  const initialTimers: Timers = {
    timer_1: {
      position: { top: 50, left: 50,},
      parentChild: { id: 'timer_1',order: 0,}
    },
    timer_2: {
      position: {top: 50,left: 50,},
      parentChild: {id: 'timer_1',order: 1,} 
    },
    timer_3: {
      position: {top: 150,left: 150,},
      parentChild: {id: 'timer_3',order: 0,}
    },
    timer_4: {
      position: {top: 250,left: 250,},
      parentChild: {id: 'timer_4',order: 0,}
    }
  };

  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [showTimerColor, setShowTimerColor] = useState("black");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const DROP_AREA = "DROP_AREA";
  const [timers, setTimer] = useState<Timers>(initialTimers);
  const [position, setPosition] = useState<{ [key: string]: { left: number; top: number } }>({
    'timer_1': { left: 350, top: 50 },
    'timer_2': { left: 350, top: 140 },
    'timer_3': { left: 200, top: 200 },
    'timer_4': { left: 250, top: 250 },
  });
  const [grouping, setGrouping] = useState<{ [key: string]: Grouping[] }>({});
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const HIGHT = 50;

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
   * ドラッグされた要素がグループの親か判定
   * @param {string} draggable
   * @returns boolean
   */
  const canGroupDrag = (draggable: string) => {
    return Object.keys(timers).includes(draggable);
  }

  /**
   * ドラッグされた要素がグループにあるか判定
   * @param {string} draggable
   * @returns boolean | string
   */
  const canRemoveTimerBlock = (draggable: string) => {
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

  const removeGrouping = (hasKey:string, draggable:string) => {
    // groupが存在しないhasKeyがからになるのでチェック
    if(!hasKey || !grouping[hasKey]) return [];

    // filterでdoraggableをグループから外してからorderの抜け番を詰める
    return grouping[hasKey].filter(group  => group.id !== draggable)
                           .map((group, index) => {
                             return {
                               ...group,
                               order: index + 1, // orderを1から始まるように再設定
                             };
                           });
  }

  const updatePosition = (event, draggable:string) => {
    return Object.entries(timers).filter(([key, value]) => value.parentChild.id === draggable)
                                 .reduce((acc: Timers, [key, value]: [string, Timer]) => {
                                    acc[key] = {
                                      ...value,
                                      position: {
                                        left: value.position.left + event.delta.x,
                                        top: value.position.top + event.delta.y,
                                      },
                                    }
                                    return acc
                                  }, {} as Timers);
  }

  /**
   * ドラッグハンドラ
   */
  const handleDrag = (event) => {
    console.log('drag drag');
    const draggable: string = event.active?.id as string;

    // グループがドラッグされた時
    if (canGroupDrag(draggable) ) {
      console.log('group drag');
      // let changeX = event.delta.x - deltaX;
      // let changeY = event.delta.y - deltaY;
      const parentLeft = timers[draggable].position.left + event.delta.x;
      const parentTop = timers[draggable].position.top + event.delta.y;

      setDeltaX(event.delta.x);
      setDeltaY(event.delta.y)
      const position = Object.entries(timers).filter(([id, value]) => value.parentChild.id === draggable)
                                             .filter(([id, value]) => id !== draggable)    
                                             .reduce((acc: Timers, [id, value]: [string, Timer]) => {
                                                acc[id] = {
                                                  ...value,
                                                  position: {
                                                    left: parentLeft,
                                                    top: parentTop,
                                                  },
                                                }
                                                return acc
                                              }, {} as Timers);

      setTimer((prev) => ({
        ...prev,
        ...position
      }));
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
      setTimer((prev) => {
        const positions : Timers = updatePosition(event, draggable);
        console.log("グループの移動", positions);
        const {[draggable]: parent, ...rest} = positions;
        return {
          ...prev,
          [draggable]: parent,
        }
      });
    }
    /* ブロック単体のエリア移動 */
    else if((canDropToDropArea(droppable) || draggable === droppable)) {
      console.log("block drop to drop area");
      setTimer((prev) => ({
        ...prev,
        [draggable]: {
          position: {
            left: prev[draggable].position.left + event.delta.x,
            top: prev[draggable].position.top + event.delta.y,
          },
          parentChild: prev[draggable].parentChild,
        },
      }));
      // グループの中にあるブロックが移動されたらグループから削除
      const hasKey = canRemoveTimerBlock(draggable);

      if(hasKey) {
        if(grouping[hasKey].length > 1) {
          setGrouping((prev) => {
            const sortedGroup : Grouping[] = removeGrouping(hasKey, draggable)
            // グループが解除された時にあき番を詰め直す
            setPosition((prev) => {
              const updatedPositions = sortedGroup.reduce((acc, group) => {
                const topPositionY: number = prev[hasKey].y;
                acc[group.id] = {
                  x: prev[group.id].x,
                  y: topPositionY + HIGHT * group.order,
                };
                return acc;
              }, {} as { [key: string]: { x: number; y: number } });
            
              return {
                ...prev,
                ...updatedPositions,
              };
            })

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
      // グループ済みのブロックが同じグループに入らないようにするためのバリデーション
      if(grouping[droppable]?.some((prev) => prev.id === draggable)) return ;

      // stateは即時反映ではないのでgroupの長さは別で考える
      const groupLength = grouping[droppable] ? (grouping[droppable].length + 1) : 1
      // groupingの更新
      // もともとグループに入っていたブロックは削除して下のreturnで更新
      const hasKey = canRemoveTimerBlock(draggable) || '';
      const deletedDoroggableBlockPrevGroup : Grouping[] = removeGrouping(hasKey,draggable);
      setGrouping((prev) => {
        const newGroup : Grouping = {
          order: prev[droppable] ? prev[droppable].length + 1 : 1,
          id: draggable
        }

        if(deletedDoroggableBlockPrevGroup.length > 0) {
          setPosition((prev) => {
            const updatedPositions = deletedDoroggableBlockPrevGroup.reduce((acc, group) => {
              const topPositionY: number = prev[hasKey].y;
              acc[group.id] = {
                x: prev[group.id].x,
                y: topPositionY + HIGHT * group.order,
              };
              return acc;
            }, {} as { [key: string]: { x: number; y: number } });
          
            return {
              ...prev,
              ...updatedPositions,
            };
          })
        }

        // ブロックがremoveされた後に元のグループがからだったらそのキーを削除するための...rest
        const { [hasKey]: _, ...rest } = prev;
 
        return { 
          ...(deletedDoroggableBlockPrevGroup.length === 0 ? rest : prev),
          [droppable]: prev[droppable] ? [...prev[droppable], newGroup] : [newGroup], // これは必須
          ...(hasKey && deletedDoroggableBlockPrevGroup.length > 0 && { 
            [hasKey]: deletedDoroggableBlockPrevGroup, // 削除後のグループも更新
          }),
        };
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
    console.log('position', position);
    console.log('grouping', grouping);
    console.log("timers", timers)
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
        {
          Object.entries(timers).map(([key, timer]) => (
            <TimerBlock id={key} position={timer.position} parentChild={timer.parentChild} />
          ))
        }

        </DnDKitArea>
      </DndContext>

    </>
  );

}

export default App;