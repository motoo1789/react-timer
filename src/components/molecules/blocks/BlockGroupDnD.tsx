import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import React, { useState, useEffect } from 'react';

type BlockGroupType = {
  id: string;
  position: { x: number; y: number };
};

export const BlockGroupDnD = (props:BlockGroupType) => {

  const position = props.position;

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  // transformからtopとleftを取り出す
  const style = {
    width: 100,
    height: 50,
    position: 'relative' as 'relative',
    backgroundColor: "white",
    color: "black",
    left: (transform ? position.x + transform.x : position.x) + "px",
    top: (transform ? position.y + transform.y : position.y) + "px",
  };

  return (
    <>
      <div ref={setNodeRef} {...listeners}  style={style} >テスト</div>
    </>
  );
};
