import { useState, createContext, useEffect } from "react";
import { useSyncExternalStore } from 'react';
//import { todosStore } from './application/TimerBlocksApplicationService';

import "./App.css";
import { TimerState } from "./components/molecules/TimerState";
import { TimeSelect } from "./components/molecules/TimeSelect";
import { ShowTimer } from "./components/atoms/ShowTimer";

import { DndContext , DragEndEvent, DragMoveEvent} from "@dnd-kit/core";
import { DnDKitArea } from "./components/molecules/DnDKitArea";
import { TimerBlock } from "./components/molecules/blocks/TimerBlock";
import { ParentChildUI, PositionUI, TimerUI } from "./type";

import { DropBlock, DragBlock} from "./application/TimerBlocksApplicationService";

// Define DragBlock with the correct signature

// type Timers = Record<Timer>;

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
  const DROP_AREA = "DROP_AREA";
  
  // const [timers, setTimer] = useState<Timers>(initialTimers);
  const HIGHT = 50;
  const timers = useSyncExternalStore(
    (onStoreChange) => {
      // Subscribe to store changes
      // Return an unsubscribe function
      return () => {
        // Unsubscribe from store changes
      };

  const addBlock = () => {
    // setBlocks([...blocks, <InteractBlock key={blocks.length} />]);
  };

  // /**
  //  * タイマーをタイマーにドロップした時の判定
  //  * @param {string} droppable : string
  //  * @param {string} droggables : object
  //  * @returns boolean
  //  */
  // const canDropToTimerBlock = (droppbles: object, droggables: string) => {
  //   return Object.keys(droppbles).includes(droggables);
  // };

  // /**
  //  * ドロップエリアにドロップされたか判定
  //  * @param {string} droppable
  //  * @returns boolean
  //  */
  // const canDropToDropArea = (droppble: string) => {
  //   return droppble === DROP_AREA;
  // };

  // /**
  //  * ドラッグされた要素がグループの親か判定
  //  * @param {string} draggable
  //  * @returns boolean
  //  */
  // const canGroupDrag = (draggable: string) => {
  //   return timers[draggable].parentChild.id === draggable || false;
  // };

  // /**
  //  * ドラッグされた要素がグループにあるか判定
  //  * @param {string} draggable
  //  * @returns boolean | string
  //  */
  // const canRemoveTimerBlock = (draggable: string) => {
  //   return timers[draggable].parentChild.id !== draggable
  //     ? timers[draggable].parentChild.id
  //     : false;
  // };

  // /**
  //  * droppableとdraggableが違う判定
  //  * @param {string} droppable
  //  * @param {string} draggable
  //  * @returns boolean
  //  */
  // const isDifferenceDroppableDraggable = (
  //   droppable: string,
  //   draggable: string
  // ) => {
  //   return droppable !== draggable;
  // };
  /**
   * ドラッグした位置を更新
   * @param {UpdatePositionEvent}
   * @param {string} draggable
   * @returns {Timers}
   **/
  // const updatePosition = (
  //   event: DragEndEvent,
  //   draggable: string
  // ): Timers => {
  //   return Object.entries(timers)
  //     .filter(([id, value]) => value.parentChild.id === draggable)
  //     .reduce((acc: Timers, [id, timer]: [string, Timer]) => {
  //       acc[id] = {
  //         ...timer,
  //         position: {
  //           left: timer.position.left + event.delta.x,
  //           top: timer.position.top + event.delta.y,
  //         },
  //       };
  //       return acc;
  //     }, {} as Timers);
  // };

  // const orderRemoveGroup = (remove: Timer, rest: Timers, groupId: string) => {
  //   const draggableOrder: number = remove.parentChild.order;
  //   const group = Object.entries(rest)
  //     .filter(
  //       ([key, timer]: [string, Timer]) => timer.parentChild.id === groupId
  //     )
  //     .filter(([key, timer]: [string, Timer]) => key !== groupId);
  //   return group
  //     .filter(
  //       ([key, timer]: [string, Timer]) =>
  //         timer.parentChild.order > draggableOrder
  //     )
  //     .reduce((acc: Timers, [id, timer]: [string, Timer]) => {
  //       acc[id] = {
  //         ...timer,
  //         parentChild: {
  //           ...timer.parentChild,
  //           order: timer.parentChild.order - 1,
  //         },
  //       };
  //       return acc;
  //     }, {} as Timers);
  // };

  /**
   * ドラッグハンドラ
   */
	// const handleDrag = (event: DragMoveEvent): void => {
	// 	console.log("drag drag");
	// 	const draggable: string = event.active?.id as string;

	// 	// グループがドラッグされた時
	// 	if (canGroupDrag(draggable)) {
	// 		console.log("group drag");
	// 		const parentLeft: number = timers[draggable].position.left + event.delta.x;
	// 		const parentTop: number = timers[draggable].position.top + event.delta.y;
	// 		const position: Timers = Object.entries(timers)
	// 			.filter(([id, value]: [string, Timer]) => value.parentChild.id === draggable)
	// 			.filter(([id, value]: [string, Timer]) => id !== draggable)
	// 			.reduce((acc: Timers, [id, value]: [string, Timer]) => {
	// 				acc[id] = {
	// 					...value,
	// 					position: {
	// 						left: parentLeft,
	// 						top: parentTop,
	// 					},
	// 				};
	// 				return acc;
	// 			}, {} as Timers);

	// 		setTimer((prev: Timers) => ({
	// 			...prev,
	// 			...position,
	// 		}));
	// 	}
	// };
  /**
   * ドロップハンドラ
   */
	// const handleDragEnd = (event: DragEndEvent): void => {
	// 	const droppable: string = event.over?.id as string;
	// 	const draggable: string = event.active?.id as string;
	// 	// グループがドラッグされた時
	// 	if (
	// 		canGroupDrag(draggable) &&
	// 		(canDropToDropArea(droppable) || draggable === droppable)
	// 	) {
	// 		console.log("group drag");
	// 		setTimer((prev: Timers) => {
	// 			const positions: Timers = updatePosition(event, draggable);
	// 			console.log("グループの移動", positions);
	// 			const { [draggable]: parent } = positions;
	// 			return {
	// 				...prev,
	// 				[draggable]: parent,
	// 			};
	// 		});
	// 	} else if (canDropToDropArea(droppable)) {
	// 		/* ブロック単体のエリア移動 */
	// 		console.log("block drop to drop area");

	// 		// グループの中にあるブロックが移動されたらグループから削除
	// 		const groupId = canRemoveTimerBlock(draggable);
	// 		console.log("parent", groupId);

	// 		setTimer((prev: Timers) => {
	// 			const { [draggable]: remove, ...rest } = prev;
	// 			// 抜けたTimerの穴埋め処理
	// 			const orderedGroup = groupId
	// 				? orderRemoveGroup(remove, rest, groupId)
	// 				: {};

	// 			return {
	// 				...prev,
	// 				...orderedGroup,
	// 				[draggable]: {
	// 					position: {
	// 						left: prev[draggable].position.left + event.delta.x,
	// 						top:
	// 							HIGHT * prev[draggable].parentChild.order + // 何段目か(親の座標をもっているので何段目かの計算が必要)
	// 							prev[draggable].position.top + // 現在の座標 + 変化量
	// 							event.delta.y,
	// 					},
	// 					parentChild: { id: draggable, order: 0 },
	// 				},
	// 			};
	// 		});

	// 		// 単体ブロックがブロックにドロップされた時グループに追加
	// 	} else if (
	// 		canDropToTimerBlock(timers, draggable) &&
	// 		!canDropToDropArea(droppable) &&
	// 		isDifferenceDroppableDraggable(droppable, draggable)
	// 	) {
	// 		// 親は子供の親にならない
	// 		if (timers[droppable].parentChild.id === draggable) {
	// 			// 親が子要素のグループになる判定がなぜか怒るがそれは良くない
	// 			// グループのドラッグ移動自体はしたいのでsetTimerして他の処理はしない
	// 			console.log("親は子供の親にならない");
	// 			setTimer((prev: Timers) => ({
	// 				...prev,
	// 				[draggable]: {
	// 					...prev[draggable],
	// 					position: {
	// 						left: prev[droppable].position.left,
	// 						top: prev[droppable].position.top,
	// 					},
	// 				},
	// 			}));
	// 			return;
	// 		}

	// 		console.log("grouping");
	// 		// グループ済みのブロックが同じグループに入らないようにするためのバリデーション
	// 		if (droppable === timers[draggable].parentChild.id) {
	// 			console.log("グループ済みのブロックは同じグループになれない");
	// 			return;
	// 		}

	// 		// 穴埋めのための処理、droppableの親を探して最大のorderを取得
	// 		const parentId = timers[droppable].parentChild.id
	// 		const groupingOrders: number[] = Object.entries(timers)
	// 			.filter(([key, timer]: [string, Timer]) => timer.parentChild.id === parentId)
	// 			.map(([key, timer]: [string, Timer]) => timer.parentChild.order);
	// 		const maxOrder = Math.max(...groupingOrders);
	// 		console.log("grouping");

	// 		// draggableに子供がいる場合の処理
  //     const droppableNewGroup: Timers = Object.entries(timers)
	// 			.filter(([id, timer]: [string, Timer]) => timer.parentChild.id === draggable)
	// 			.reduce((acc: Timers, [id, timer]: [string, Timer]) => {
	// 				acc[id] = {
	// 					...timer,
	// 					position: {
	// 						left: timers[droppable].position.left,
	// 						top: timers[droppable].position.top,
	// 					},
	// 					parentChild: {
	// 						id: parentId,
	// 						order: timer.parentChild.order + maxOrder + 1,
	// 					}
	// 				}
	// 				return acc;
	// 			}, {} as Timers);

	// 		// TODO:処理の分岐が良くない気がする
	// 		// draggableが子Timerの場合子供がいる場合の処理は行われないので
	// 		// droppableNewGroupにdraggableの要素が入らないここで入れる
	// 		// returnのところで直接書いてもいいけど2重の更新になる
	// 		if(!droppableNewGroup[draggable]){
	// 			droppableNewGroup[draggable] = {
	// 				position: {
	// 					left: timers[droppable].position.left,
	// 					top: timers[droppable].position.top,
	// 				},
	// 				parentChild: {
	// 					id: parentId,
	// 					order: maxOrder + 1,
	// 				}
	// 			}
	// 		}

	// 		setTimer((prev: Timers) => {
	// 			const groupId = canRemoveTimerBlock(draggable);
	// 			const { [draggable]: remove, ...rest } = prev;
	// 			// 抜けたTimerの穴埋め処理
	// 			const orderedGroup = groupId
	// 				? orderRemoveGroup(remove, rest, groupId)
	// 				: {};

	// 			return {
	// 				...prev,
	// 				// 抜けたTimerの穴埋め処理
	// 				...orderedGroup,
	// 				// draggableの子供を移動
	// 				...droppableNewGroup,
	// 			};
	// 		});
	// 	}
	// };

  // postionやgroupingの変更を監視
  useEffect(() => {
    console.log("timers", timers);
  }, [timers]);

  // const tmp : TimerBlocksApplicationService = new TimerBlocksApplicationService();

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
          {Object.entries(timers).map(([key, timer]) => (
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
