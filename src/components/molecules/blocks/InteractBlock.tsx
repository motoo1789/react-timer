import { useInteractJS } from '../../../hooks'
import { useState } from 'react';

type InteractBlock<T> = {
    [P in keyof T]?: T[P]
};

const initPosition = {
    width: 150,
    height: 50,
    x: 0,
    y: 0
  }

type test = {
    id: number
}
export const InteractBlock = (props:test) => {
    const[position, setPosition] = useState({x:0, y: 0, width: 150, height: 50});
    const interact = useInteractJS(undefined, props.id)


    return (
        <div
            ref={interact.ref}
            className="draggable dropzone"
            style={{
                ...interact.style,
                border: '2px solid #0489B1',
                backgroundColor: '#A9D0F5'
            }}>
        </div>
    );
}

