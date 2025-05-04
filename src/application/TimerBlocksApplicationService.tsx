import { useState, createContext, useEffect } from "react";
import { useSyncExternalStore } from "react";
import { DragEndEvent, DragMoveEvent} from "@dnd-kit/core";

// import { todosStore } from '../application/TimerBlocksApplicationService';
import { Block } from "../domain/block/Block";
import { BlockId } from "../domain/block/BlockId";
import { BlockFactory } from "../domain/block/BlockFactory";


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
  getSnapshot: () => Blocks;
  handler(event: DragEndEvent | DragMoveEvent): void;
}

let nextId = 0;
let blocks: Blocks = {
  timer_1: BlockFactory.createBlock("timer_1", 50, 50, "timer_1",0 )
};
let todos = [{ id: 9, text: "Todo #1" }];
let listeners: Array<() => void> = [];
// todos: [{ id: 0, text: 'Todo #1' }],
// listeners: [] as Array<() => void>,

export const DragBlock : BlockService = {
  subscribe(listener: () => void): () => void {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l: () => void) => l !== listener);
    }
  },
  getSnapshot() {
    return blocks;
  },

  handler(event: DragMoveEvent): void { 
    console.log("drag drag");
    const draggable: string = event.active?.id as string;

    // グループがドラッグされた時
    if (blocks[draggable].isParent()) {
      console.log("group drag");
      blocks[draggable].updatePosition(event.delta.y, event.delta.x);
      // const newLeft: number = blocks[draggable].position.left + event.delta.x;

      Object.entries(blocks).filter(([id, block]) => block.isDragGroup(draggable))
                            .forEach(([id, block]) => {
                              block.updatePosition(event.delta.y, event.delta.x);
                            });
      listeners.forEach((listener) => listener());
    }
  }
}



