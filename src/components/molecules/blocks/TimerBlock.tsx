import {useDraggable, useDroppable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import React, { useState, useEffect } from 'react';
import { ParentChild, Position } from "../../../type";

type TimerBlockType = {
  id: string;
  position: Position,
  parentChild: ParentChild
};

export const TimerBlock = (props:TimerBlockType) => {
  // console.log(props);
  const position = props.position;
  const parentChild = props.parentChild;
  const WIDTH = 100;
  const HEIGHT = 50;
  const top = parentChild.order * HEIGHT + position.top
  const {isOver, setNodeRef: setDroppableRef} = useDroppable({
    id: props.id,
  });

  const {attributes, listeners, setNodeRef: setDraggableRef, transform} = useDraggable({
    id: props.id,
  });
  // transformからtopとleftを取り出す
  const style = {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute' as 'absolute',
    backgroundColor: "white",
    color: "black",
    left: (transform ? position.left + transform.x : position.left) + "px",
    top: (transform ? top + transform.y : top) + "px",
  };

  return (
    <>
      <div ref={(node) => {
        setDroppableRef(node);
        setDraggableRef(node);
      }} {...listeners}  style={style} >テスト{props.id}</div>
    </>
  );
};
