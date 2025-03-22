import {useDraggable, useDroppable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import React, { useState, useEffect } from 'react';

type BlockGroupType = {
  id: string;
  position: { x: number; y: number };
};

export const BlockGroupDnD = (props:BlockGroupType) => {
  // console.log(props);
  const position = props.position;
  const {isOver, setNodeRef: setDroppableRef} = useDroppable({
    id: props.id,
  });

  const {attributes, listeners, setNodeRef: setDraggableRef, transform} = useDraggable({
    id: props.id,
  });
  // transformからtopとleftを取り出す
  const style = {
    width: 100,
    height: 50,
    position: 'absolute' as 'absolute',
    backgroundColor: "white",
    color: "black",
    left: (transform ? position.x + transform.x : position.x) + "px",
    top: (transform ? position.y + transform.y : position.y) + "px",
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
