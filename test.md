{
    'timer_1' : {
        top: 59,
        left: 30,
        child: []
    },
    'timer_2' : {
        top: 50,
        left: 220,
        child: [
            {
                id: 'timer_3'
                order: 1,
            },
            {
                id: 'timer_4'
                order: 2,
            },
        ]
    }
}

//////

import { useState, createContext, useEffect } from "react";

import "./App.css";
import { TimerState } from "./components/molecules/TimerState";
import { TimeSelect } from "./components/molecules/TimeSelect";
import { ShowTimer } from "./components/atoms/ShowTimer";

import { DndContext } from "@dnd-kit/core";
import { DnDKitArea } from "./components/molecules/DnDKitArea";
import { BlockGroupDnD } from "./components/molecules/blocks/BlockGroupDnD";

type TimerChild = {
  id: string;
  order: number;
};

type Position = {
  top: number;
  left: number;
}

type Timer = {
  position: Position;
  child: TimerChild[];
};

type Timers = Record<string, Timer>;


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
  const initialTimers: Timers = {
    timer_1: {
        position: {
          top: 40,
          left: 20
        },
        child: []
    },
    timer_2: {
        position: {
          top: 100,
          left: 100,
        },
        child: [
            {
                id: "timer_3",
                order: 1,
            },
            {
                id: "timer_4",
                order: 2,
            },
        ]
    }
  };
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [showTimerColor, setShowTimerColor] = useState("black");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const DROP_AREA = "DROP_AREA";
  const [timers, setTimer] = useState<Timers>(initialTimers);
  const [position, setPosition] = useState<{ [key: string]: { x: number; y: number } }>({
    'timer_old_1': { x: 350, y: 50 },
    'timer_old_2': { x: 350, y: 140 },
    'timer_old_3': { x: 200, y: 200 },
    'timer_old_4': { x: 250, y: 250 },
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
    return Object.keys(grouping).includes(draggable);
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
      // TODO: 直す、なにかエラーがあったら原因かも
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
            Object.entries(timers).map(([id, timer]) => (
              <BlockGroupDnD id={'timer_old_1'} position={id.timer_old_1} />
            ))
          }

          
          <BlockGroupDnD id={'timer_old_1'} position={position.timer_old_1} />
          <BlockGroupDnD id={'timer_old_2'} position={position.timer_old_2} />

          <BlockGroupDnD id={'timer_1'} position={timers.timer_1.position} />
          <BlockGroupDnD id={'timer_2'} position={timers.timer_2.position} />

        </DnDKitArea>
      </DndContext>

    </>
  );

}

export default App;