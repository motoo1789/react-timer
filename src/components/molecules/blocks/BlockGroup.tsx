import { useDrag, useDrop, XYCoord } from "react-dnd";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type BlockGroupType = {
	id: number;
  top: number;
  left: number; 
  
}

export const BlockGroup = (props : BlockGroupType) => {
		
    const top = props.top;
    const left = props.left;
    const id = props.id;

    console.log(props.top);

    const [collected, drag, dragPreview] = useDrag(
        {
            type: "timerBox",
            item: { id: id, top, left: left },
            end: (item, monitor) => {
                console.log(monitor.getDifferenceFromInitialOffset() as XYCoord);
                 const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
                 console.log(delta);
                const dropResult = monitor.getDropResult();
                if (item && dropResult) {
                    console.log(`You dropped ${item.id} into ${dropResult.id}!`);
                }
            }
        },
        
    );
		
    return (
        
        <div
            ref={drag}
            style={{
                border: '2px solid #0489B1',
                backgroundColor: '#A9D0F5',
                top: props.top,
                left: props.left,
                height: "75px",
                width: "200px",
                position: "absolute",
            }}>
			      Block {props.id}
        </div>
    );
}

