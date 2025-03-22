import {useDraggable, useDroppable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

type InteractBlock<T> = {
    [P in keyof T]?: T[P]
};

type InteractBlockProps = {
		key: number;
};

export const InteractBlock = (props:InteractBlockProps) => {
  const { attributes, listeners, setNodeRef: setNodeRefDraggable, transform } = useDraggable({
    id:props.key,
  });
  const { isOver, setNodeRef: setNodeRefDroppable } = useDroppable({
    id:props.key,
  });

  // カスタム関数を使って複数のrefを結合
  const combinedDnDRef = (node: HTMLElement | null) => {
    setNodeRefDraggable(node);
    setNodeRefDroppable(node);
  };

	const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
		width: '150px',
		height: '75px',
		border: '2px solid #0489B1',
		backgroundColor: '#A9D0F5',
    opacity: isOver ? 1 : 0.5,
  };
	/*
	            style={{
                transform: `translate3D(0px, 0px, 0)`,
                width: '150px',
                height: '75px',
                border: '2px solid #0489B1',
                backgroundColor: '#A9D0F5'
            }}>
		*/

    return (
        <div
						ref={combinedDnDRef}
						{...attributes}
						{...listeners}
						style={style} 
				>
        </div>
    );

}


// export const InteractBlock = (props) => {
// 	const [box, setBox] = useState<Box>({ top: 20, left: 20 });

//     return (
//         <div
//             ref={interact.ref}
//             style={{
//                 ...interact.style,
//                 border: '2px solid #0489B1',
//                 backgroundColor: '#A9D0F5'
//             }}>
//         </div>
//     );
// }

