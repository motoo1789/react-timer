import React, { useState } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { BlockGroup } from "./blocks/BlockGroup";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";



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


export const DnDKitArea = () => {
  // 追加するときにAreaの関数を渡してdragしたときに渡された関数を呼べば、親に座標を渡せる？？
  const [blockGroups, setBlockGroups] = useState([<BlockGroup id={0} top={0} left={0} />]);
  // const [blockGroups, setBlockGroup] = useState([<BlockGroup key={0} top={0} left={0} />]);


  return (
    <div>

    </div>
  );
};