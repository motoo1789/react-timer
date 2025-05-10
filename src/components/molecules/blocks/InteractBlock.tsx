import { useDrag, useDrop, XYCoord } from "react-dnd";

type InteractBlock<T> = {
    [P in keyof T]?: T[P]
};

type InteractBlockProps = {
	drop?: (event: React.DragEvent<HTMLDivElement>) => void;
};

export const InteractBlock = (props: InteractBlockProps) => {
	// const [box, setBox] = useState<Box>({ top: 20, left: 20 });
	const drop = useDrop();

	return (
		<div
			ref={drop.ref}
			style={{
				...drop.style,
				border: '2px solid #0489B1',
				backgroundColor: '#A9D0F5'
			}}
			onDrop={props.drop}>
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

