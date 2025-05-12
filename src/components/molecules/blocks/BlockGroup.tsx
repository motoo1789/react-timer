import { useDrag, useDrop, XYCoord } from "react-dnd";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type BlockGroupType = {
	id: number;
    top: number;
    left: number;
    // 関数が渡されるようにしてください
    moveBlock: () => () => void;
    
}

export const BlockGroup = (props : BlockGroupType) => {
		
    
    // バリューオブジェクトで考えるのであれば新規で作った方がいいか
        const { id, setId } = useState(props.id);
        const { top, setTop } = useState(props.top);
        const { left, setLeft } = useState(props.left);

		// const [BoxGroup, setBlockGroup] = useState<BlockGroupType>({ top: props.top, left: props.left });
    // const top = props.top;
    // const left = props.left;

    // const [collectedProps, drop] = useDrop(
    //     () => ({
    //       accept: "timerBox",
    //       drop(item: BlockGroupType, monitor) {
    //         const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
    //         const left = Math.round(item.left + delta.x);
    //         const top = Math.round(item.top + delta.y);
    //         setBox({ top, left });
    //         return undefined;
    //       }
    //     }),
    //     []
    //   );


    const [collected, drag, dragPreview] = useDrag(
        {
            type: "timerBox",
            // item: { 
            //     // id: {
            //     //     props.id,
            //     //     setId
            //     // },

            //         topValue: props.top,
            //         setTop: setTop,
            //     // },
            //     // left: {
            //         leftValue: props.left,
            //         setLeft: setLeft
            //     // }
            // }
            item: { id: props.id, top, left, setTop, setLeft },
        },
        [setId, setTop, setLeft]
    );
		
    return (
        <div
            ref={drag}
            style={{
                // ...interact.style,
                border: '2px solid #0489B1',
                backgroundColor: '#A9D0F5',
                top: top,
                left: left,
                height: "75px",
                width: "200px",
            }}>
			Block {props.id}
        </div>
    );
}

