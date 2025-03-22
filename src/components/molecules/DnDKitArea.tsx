import React, { useState } from "react";

import {useDroppable} from '@dnd-kit/core';


type BlockGroupType = {
  children: React.ReactNode;
};


export const DnDKitArea = (props:BlockGroupType) => {

  const {isOver, setNodeRef} = useDroppable({
    id: 'DROP_AREA',
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
    backgroundColor: isOver ? 'green' : 'blue',
    width: '500px',
    height: '500px',
    position: 'relative' as 'relative',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};