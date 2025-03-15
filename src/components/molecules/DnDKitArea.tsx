import React, { useState } from "react";

import { BlockGroup } from "./blocks/BlockGroup";

import {useDroppable} from '@dnd-kit/core';


type BlockGroupType = {
  id: number
  top: number;
  left: number;
};

// type UpdatePoint = {

//     id: {
//         value: number,
//         set: (id:number) => void
//     },
//     top: {
//         value: number,
//         set: (top:number) => void

//     },
//     left: {
//         value: number,
//         set: (left:number) => void
//     }
// };


export const DnDKitArea = (props) => {
  // 追加するときにAreaの関数を渡してdragしたときに渡された関数を呼べば、親に座標を渡せる？？
  // const [blockGroups, setBlockGroups] = useState([<BlockGroup id={0} top={0} left={0} />]);
  // const [blockGroups, setBlockGroup] = useState([<BlockGroup key={0} top={0} left={0} />]);


  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
    backgroundColor: isOver ? 'green' : 'blue',
    width: '500px',
    height: '500px',
    // position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};