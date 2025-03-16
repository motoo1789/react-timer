import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import React, { useState, useEffect } from 'react';

type BlockGroupType = {
  children: React.ReactNode;
};

export const BlockGroupDnD = (props: {x:number, y:number, id:number, children:any}) => {

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  // transformからtopとleftを取り出す
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    //position: 'absolute',
    //position: 'relative',
    top: props.y,
    left: props.x,

  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};
