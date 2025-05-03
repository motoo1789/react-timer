import { useState, createContext, useEffect } from "react";
import { useSyncExternalStore } from 'react';
// import { todosStore } from '../application/TimerBlocksApplicationService';
import { Block } from "../domain/block/Block";

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

let nextId = 0
let todos = [{ id: 9, text: 'Todo #1' }];
let  listeners: Array<() => void> = [];
// todos: [{ id: 0, text: 'Todo #1' }],
// listeners: [] as Array<() => void>,

export const todosStore = {
  
  addTodo() {
    todos = [...todos, { id: nextId++, text: 'Todo #' + nextId }]
    emitChange();
  },
  subscribe(listener: () => void): () => void {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l: () => void) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  }

};

function emitChange() {
  console.log('emitChange');
  listeners.forEach(listener => listener());
}

// export class TimerBlocksApplicationService {
//   private nextId = 0;
//   private todos = [{ id: this.nextId++, text: 'Todo #1' }];
//   private listeners: Array<() => void> = [];

//   constructor() {
//     this.getSnapshot = this.getSnapshot.bind(this);
//     this.subscribe = this.subscribe.bind(this);
//     this.addTodo = this.addTodo.bind(this);
//     this.emitChange = this.emitChange.bind(this);
//   }

//   addTodo() {
//     console.log('addTodo');
//     todos = [...todos, { id: this.nextId++, text: 'Todo #' + this.nextId }]
//     this.emitChange();
//   }
//   subscribe(listener: () => void): () => void {
//     listeners = [...listeners, listener];
//     return () => {
//       this.listeners = listeners.filter((l: () => void) => l !== listener);
//     };
//   }
//   getSnapshot() {
//     console.log('getSnapshot');
    
//     //console.log(this.todos);
//     return todos;
//   }

//   emitChange() {
//     console.log('emitChange');
//     listeners.forEach(listener => listener());
//   }
// }