import React, { useState } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { BlockGroup } from "./blocks/BlockGroup";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ContainerStyle: React.CSSProperties = {
  width: 500,
  height: 500,
  backgroundColor: "silver",
  position: "relative", // 親要素にrelativeを追加
};

const BoxStyle: React.CSSProperties = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
};

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

type UpdatePoint = {


    topValue: number,
    setTop: React.Dispatch<React.SetStateAction<number>>,
    leftValue: number,
    setLeft: React.Dispatch<React.SetStateAction<number>>,

};

export const DnDArea = () => {
  // 追加するときにAreaの関数を渡してdragしたときに渡された関数を呼べば、親に座標を渡せる？？
  const [blockGroups, setBlockGroups] = useState([<BlockGroup id={0} top={0} left={0} />]);
  // const [blockGroups, setBlockGroup] = useState([<BlockGroup key={0} top={0} left={0} />]);

  const moveBlock = (id: number, left: number, top: number) => {
    setBlockGroups((prevBlocks ) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, left, top } : block
      )
    );
  };

  // const [collected, drag, dragPreview] = useDrag(
  //   {
  //     type: "timerBox",
  //     item: { top: box.top, left: box.left }
  //   },
  //   [box]
  // );

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: "timerBox",
      drop(item: { id: number; top: number; left: number; setTop: React.Dispatch<React.SetStateAction<number>>; setLeft: React.Dispatch<React.SetStateAction<number>> } , monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        item.setTop(Math.round(item.topValue + delta.y));
        item.setLeft(Math.round(item.leftValue + delta.x));
        // const left = Math.round(item.left + delta.x);
        // const top = Math.round(item.top + delta.y);

        return undefined;
      }
    }),
    []
  );


  return (

      <div ref={drop} style={ContainerStyle}>
          { blockGroups }
      </div>

  );
};