import React, { useState } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { InteractBlock } from "./blocks/InteractBlock";

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

type Box = {
  top: number;
  left: number;
};

export const DnDArea = () => {
  const [box, setBox] = useState<Box>({ top: 20, left: 20 });
  const [blocks, setBlocks] = useState([<InteractBlock key={0} />]);

  // const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
  //   const newTop = event.clientY - event.currentTarget.offsetHeight / 2;
  //   const newLeft = event.clientX - event.currentTarget.offsetWidth / 2;
  //   setBox({ top: newTop, left: newLeft });
  // };

  const [collected, drag, dragPreview] = useDrag(
    {
      type: "box",
      item: { top: box.top, left: box.left }
    },
    [box]
  );

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item: Box, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        setBox({ top, left });
        return undefined;
      }
    }),
    []
  );


  return (
    <div ref={drop} style={ContainerStyle}>
      <div ref={drag} style={{ ...BoxStyle, top: box.top, left: box.left }}>
        Drag me around
      </div>
    </div>
  );
};