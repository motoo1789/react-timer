import React, { useState } from "react";

import { BlockGroupDnD } from "./blocks/BlockGroupDnD";
import { DndContext } from "@dnd-kit/core";
import {useDroppable} from '@dnd-kit/core';


type BlockGroupType = {
  children: React.ReactNode;
  // position: { x: number; y: number };
  // setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
};


export const DnDKitArea = (props:BlockGroupType) => {
  // 追加するときにAreaの関数を渡してdragしたときに渡された関数を呼べば、親に座標を渡せる？？

  // const [position, setPosition] = useState({ x: 50, y: 50 });
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
    backgroundColor: isOver ? 'green' : 'blue',
    width: '500px',
    height: '500px',
    // position: 'relative',
  };

  return (
    // <DndContext onDragEnd={(event) => {
    //   console.log(event)
    //   if(event.active?.id === "draggable") {
    //     console.log("dropped");
    //     console.log(setNodeRef)
    //     setPosition((prev) => ({
    //         x: prev.x + event.delta.x,
    //         y: prev.y + event.delta.y,
    //       }));
    //     }
    // }}>
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
    // </DndContext>
    
  );
};