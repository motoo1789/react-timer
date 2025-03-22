import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

type BlockGroupType = {
  children: React.ReactNode;
};

export const BlockGroup = (props) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  console.log(transform);
  // transformからtopとleftを取り出す
  const { x, y,  } = transform || {};
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    //position: 'absolute',
    //position: 'relative',
    top: y,
    left: x,

  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};
