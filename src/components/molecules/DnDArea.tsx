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
  id: number;
  top: number;
  left: number;

};

export const DnDArea = () => {

  const [blockGroups, setBlockGroups] = useState<BlockGroupType[]>([{ id: 0, top: 0, left: 0 }]);
  const moveBlock = (id: number, left: number, top: number) => {
    setBlockGroups((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, left, top } : block
      )
    );
  };

  const addBlock = () => {
    // blockGroupsのlengthをidにすると削除した時とかでエラー出る
    setBlockGroups([...blockGroups, { 
      id: blockGroups.length, 
      top: Math.floor(Math.random() * 500), 
      left: Math.floor(Math.random() * 500) 
    }]);
  };

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: "timerBox",
      drop(item: { id: number; top: number; left: number }, monitor) {

        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBlock(item.id, left, top);
        console.log(monitor.getClientOffset());
        return undefined;
      },
    }),
    []
  );

  return (
    <>
      <button onClick={addBlock}>ブロックを追加</button>
      <div ref={drop} style={ContainerStyle}>
        {blockGroups.map((block) => (
          <BlockGroup key={block.id} id={block.id} top={block.top} left={block.left} />
        ))}
      </div>
    </>
  );
};
