import { useState, createContext, useEffect } from "react";
import { useSyncExternalStore } from "react";
import { DragEndEvent, DragMoveEvent } from "@dnd-kit/core";

// import { todosStore } from '../application/TimerBlocksApplicationService';
import { Block } from "../domain/block/Block";
import { BlockId } from "../domain/block/BlockId";
import { BlockFactory } from "../domain/block/BlockFactory";
import { Order } from "../domain/block/parent_child/Order";
import { Group } from "../domain/block/parent_child/Group";
import { UIJsonFactory } from "../domain/UI/UIJsonFactory";
import { Timers } from "../type.tsx";

const initialTimers = {
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

type Blocks = {
  [key: string]: Block;
};

interface BlockService {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => Timers;
  handler(event: DragEndEvent | DragMoveEvent): void;
}


const blocks: Blocks = {
  timer_1: BlockFactory.createBlock("timer_1", 50, 50, "timer_1", 0),
  timer_2: BlockFactory.createBlock("timer_2", 150, 150, "timer_2", 0),
  timer_3: BlockFactory.createBlock("timer_3", 150,150, "timer_2", 1),};

let listeners: Array<() => void> = [];
const DROP_AREA = "DROP_AREA";
// todos: [{ id: 0, text: 'Todo #1' }],
// listeners: [] as Array<() => void>,

const orderRemoveGroup = (remove: Block, rest: Blocks, groupId: string) => {
  const draggableOrder: Order = remove.getOrder();
  const group = Object.entries(rest)
    .filter(([key, block]: [string, Block]) => block.isDragGroup(groupId))
    .filter(([key, block]: [string, Block]) => key !== groupId);
  return (
    group
      .filter(([key, block]: [string, Block]) =>
        block.isOverOrder(draggableOrder)
      )
      // TODO：最後に材料揃えてFactoryになげてもいいかも
      .reduce((acc: BlockId[], [id, block]: [string, Block]) => {
        acc.push(block.getBlockId());
        // acc[id] = {
        // 穴埋め後のorderを生成してセットしてあげればいいのか
        // ...block,
        // parentChild: {
        //   ...block.parentChild,
        //   order: block.parentChild.order - 1,
        // },
        // };
        return acc;
      }, [] as BlockId[])
  );
};

export const DragBlock: BlockService = {
  subscribe(listener: () => void): () => void {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l: () => void) => l !== listener);
    };
  },
  getSnapshot() {
    // console.log("DragBlock getSnapshot")
    const uiBlock = {} as Timers;
    // blocksを回してUI層で使えるblocksの形式に変換
    Object.entries(blocks).forEach(([key, block]) => {
      uiBlock[key] = UIJsonFactory(block);
    });
    return uiBlock;
  },

  handler(event: DragMoveEvent): void {
    console.log("drag drag");
    const draggable: string = event.active?.id as string;
    const draggableTop: number = blocks[draggable].getTopValue();
    const draggableLeft: number = blocks[draggable].getLeftValue();
    console.log("draggableTop", draggableTop);
    console.log("event.delta.y", event.delta.y);


    // グループがドラッグされた時
    if (blocks[draggable].isParent()) {
      console.log("group drag");
      // blocks[draggable].updatePosition(event.delta.y, event.delta.x);
      // const newLeft: number = blocks[draggable].position.left + event.delta.x;

      Object.entries(blocks)
        .filter(([id, block]) => block.isDragGroup(draggable))
        .filter(([id, block]) => !block.isParent())
        .forEach(([id, block]) => {
          // const childTop = block.getTopValue();
          // console.log("childTop", childTop);
          // const childLeft = block.getLeftValue();
          block.drag(draggableTop + event.delta.y, draggableLeft + event.delta.x);
        });
      listeners.forEach((listener) => listener());

      emitChange();
    }
  },
};

export const DropBlock: BlockService = {
  subscribe(listener: () => void): () => void {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l: () => void) => l !== listener);
    };
  },
  getSnapshot() {
    // console.log("DropBlock getSnapshot")
    const uiBlock = {} as Timers;
    // blocksを回してUI層で使えるblocksの形式に変換
    Object.entries(blocks).forEach(([key, block]) => {
      uiBlock[key] = UIJsonFactory(block);
    });
    return uiBlock;
  },

  handler(event: DragEndEvent): void {
    const droppable: string = event.over?.id as string;
    const draggable: string = event.active?.id as string;
    // グループがドラッグされた時
    if (
      blocks[draggable].isParent() &&
      (droppable === DROP_AREA || draggable === droppable)
    ) {
      console.log("group drop");
      blocks[draggable].updatePosition(event.delta.y, event.delta.x);
      // Object.entries(blocks)
      //   .filter(([id, block]) => block.isDragGroup(draggable))
      //   .forEach(([id, block]) => {
      //     block.updatePosition(event.delta.y, event.delta.x);
      //   });
      listeners.forEach((listener) => listener());
      // setTimer((prev: Timers) => {
      //   const positions: Timers = updatePosition(event, draggable);
      //   console.log("グループの移動", positions);
      //   const { [draggable]: parent } = positions;
      //   return {
      //     ...prev,
      //     [draggable]: parent,
      //   };
      // });
    } else if (canDropToDropArea(droppable)) {
      /* ブロック単体のエリア移動 */
      console.log("block drop to drop area");

      // グループの中にあるブロックが移動されたらグループから削除
      const groupId = blocks[draggable].canRemoveTimerBlock(draggable);
      console.log("parent", groupId);

      // setTimer((prev: Timers) => {
      const { [draggable]: remove, ...rest } = blocks;
      // 抜けたTimerの穴埋め処理
      const orderedFillBlockIds: BlockId[] = groupId
        ? orderRemoveGroup(remove, rest, groupId)
        : [];

      // 繰り返しで回すためにdraggableのidもいれとく
      // orderedRemoveBlockIds.push(blocks[draggable].getBlockId());
      orderedFillBlockIds.forEach((fillBlock) => {
        blocks[fillBlock.getId()].updateFillBlock();
      });

      blocks[draggable] = BlockFactory.removedGroupBlock(
        blocks[draggable],
        event.delta.y,
        event.delta.x
      );
      // return {
      //   ...prev,
      //   ...orderedGroup,
      //   [draggable]: {
      //     position: {
      //       left: prev[draggable].position.left + event.delta.x,
      //       top:
      //         HIGHT * prev[draggable].parentChild.order +
      //         prev[draggable].position.top +
      //         event.delta.y,
      //     },
      //     parentChild: { id: draggable, order: 0 },
      //   },
      // };
      // });

      // 単体ブロックがブロックにドロップされた時グループに追加
    } else if (
      canDropToTimerBlock(blocks, draggable) &&
      !canDropToDropArea(droppable) &&
      isDifferenceDroppableDraggable(droppable, draggable)
    ) {
      // 親は子供の親にならない
      if (blocks[droppable].isDragGroup(draggable)) {
        // 親が子要素のグループになる判定がなぜか怒るがそれは良くない
        // グループのドラッグ移動自体はしたいのでsetTimerして他の処理はしない
        console.log("親は子供の親にならない");
        blocks[draggable].updatePosition(event.delta.y, event.delta.x);
        emitChange();
        // setTimer((prev: Timers) => ({
        //   ...prev,
        //   [draggable]: {
        //     ...prev[draggable],
        //     position: {
        //       left: prev[droppable].position.left,
        //       top: prev[droppable].position.top,
        //     },
        //   },
        // }));
        return;
      }

      console.log("grouping");
      // グループ済みのブロックが同じグループに入らないようにするためのバリデーション
      if (blocks[draggable].isDragGroup(droppable)) {
        console.log("グループ済みのブロックは同じグループになれない");
        return;
      }

      // 穴埋めのための処理、droppableの親を探して最大のorderを取得
      const parentId: Group = blocks[droppable].getGroup();
      const maxOrder: Order = Object.entries(blocks)
        .filter(([key, block]: [string, Block]) =>
          block.isSameGroupUseGroup(parentId)
        )
        .reduce(
          (maxOrder: Order, [, block]: [string, Block]) =>
            block.isOverOrder(maxOrder) ? block.getOrder() : maxOrder,
          new Order(0) // 初期値を安全に設定
        );
      // const maxOrder = Math.max(...groupingOrders);
      // const parentId = timers[droppable].parentChild.id;
      // const groupingOrders: number[] = Object.entries(timers)
      //   .filter(
      //     ([key, timer]: [string, Timer]) => timer.parentChild.id === parentId
      //   )
      //   .map(([key, timer]: [string, Timer]) => timer.parentChild.order);
      // const maxOrder = Math.max(...groupingOrders);
      console.log("grouping");

      // draggableに子供がいる場合の処理
      // driooabke orderをMaxOrderから+1してあげる対象ブロック
      
      const droppableNewGroup :Array<[string, Block]> = Object.entries(blocks)
      .filter(([id, block]: [string, Block]) => block.isDragGroup(draggable))
      // .forEach(([id, block]: [string, Block]) => {
      //   block.groupintSortOrder(groupingOrders);
      //   block.setPosition(blocks[droppable].getPosition());
      // });
      droppableNewGroup.forEach(([id, block]: [string, Block]) => {
        block.setNewGroupToDraggable(droppable);
        block.groupingSortOrder(maxOrder);
        block.setPosition(blocks[droppable].getPosition());
      });
      // ドラッググループの子ブロックのorderの変更

      // .reduce((acc: Timers, [id, timer]: [string, Timer]) => {
      //   acc[id] = {
      //     ...timer,
      //     position: {
      //       left: timers[droppable].position.left,
      //       top: timers[droppable].position.top,
      //     },
      //     parentChild: {
      //       id: parentId,
      //       order: timer.parentChild.order + maxOrder + 1,
      //     },
      //   };
      //   return acc;
      // }, {} as Timers);
      // const droppableNewGroup: Timers = Object.entries(timers)
      //   .filter(
      //     ([id, timer]: [string, Timer]) => timer.parentChild.id === draggable
      //   )
      //   .reduce((acc: Timers, [id, timer]: [string, Timer]) => {
      //     acc[id] = {
      //       ...timer,
      //       position: {
      //         left: timers[droppable].position.left,
      //         top: timers[droppable].position.top,
      //       },
      //       parentChild: {
      //         id: parentId,
      //         order: timer.parentChild.order + maxOrder + 1,
      //       },
      //     };
      //     return acc;
      //   }, {} as Timers);

      // TODO:処理の分岐が良くない気がする
      // draggableが子Timerの場合子供がいる場合の処理は行われないので
      // droppableNewGroupにdraggableの要素が入らないここで入れる
      // returnのところで直接書いてもいいけど2重の更新になる
      if (droppableNewGroup.length === 0) {
        blocks[draggable].setPosition(blocks[droppable].getPosition());
        blocks[draggable].grouping(maxOrder);
        
        // droppableNewGroup[draggable] = {
        //   position: {
        //     left: timers[droppable].position.left,
        //     top: timers[droppable].position.top,
        //   },
        //   parentChild: {
        //     id: parentId,
        //     order: maxOrder + 1,
        //   },
        // };
      }
      // グループの中にあるブロックが移動されたらグループから削除
      const groupId = blocks[draggable].canRemoveTimerBlock(draggable);

      const { [draggable]: remove, ...rest } = blocks;
      // 抜けたTimerの穴埋め処理
      const orderedFillBlockIds: BlockId[] = groupId
        ? orderRemoveGroup(remove, rest, groupId)
        : [];

      // 繰り返しで回すためにdraggableのidもいれとく
      // orderedRemoveBlockIds.push(blocks[draggable].getBlockId());
      orderedFillBlockIds.forEach((fillBlock) => {
        blocks[fillBlock.getId()].updateFillBlock();
      });

      // setTimer((prev: Timers) => {
      //   const groupId = canRemoveTimerBlock(draggable);
      //   const { [draggable]: remove, ...rest } = prev;
      //   // 抜けたTimerの穴埋め処理
      //   const orderedGroup = groupId
      //     ? orderRemoveGroup(remove, rest, groupId)
      //     : {};

      //   return {
      //     ...prev,
      //     // 抜けたTimerの穴埋め処理
      //     ...orderedGroup,
      //     // draggableの子供を移動
      //     ...droppableNewGroup,
      //   };
      // });
    }
    emitChange();
  },
};

/**
 * タイマーをタイマーにドロップした時の判定
 * @param {string} droppable : string
 * @param {string} droggables : object
 * @returns boolean
 */
const canDropToTimerBlock = (droppbles: object, droggables: string) => {
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
 * droppableとdraggableが違う判定
 * @param {string} droppable
 * @param {string} draggable
 * @returns boolean
 */
const isDifferenceDroppableDraggable = (
  droppable: string,
  draggable: string
) => {
  return droppable !== draggable;
};

function emitChange() {
  console.log('emitChange');
  listeners.forEach(listener => listener());
}