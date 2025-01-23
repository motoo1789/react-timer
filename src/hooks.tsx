import { useRef, useEffect, useState, CSSProperties } from 'react'
import interact from 'interactjs'

type Partial<T> = {
  [P in keyof T]?: T[P]
}

const initPosition = {
  width: 150,
  height: 50,
  x: 0,
  y: 0
}

/**
 * HTML要素を動かせるようにする
 * 返り値で所得できるinteractRefと、interactStyleをそれぞれ対象となるHTML要素の
 * refとstyleに指定することで、そのHTML要素のリサイズと移動が可能になる
 * @param position HTML要素の初期座標と大きさ、指定されない場合はinitPositionで指定された値になる
 */
export function useInteractJS(
  position: Partial<typeof initPosition> = initPosition
) {
  const [_position, setPosition] = useState({
    ...initPosition,
    ...position
  })
  const [isEnabled, setEnable] = useState(true)
  const [zIndex, setZIndex] = useState(1);

  const interactRef = useRef(null)
  let { x, y } = _position
  const { width, height } = _position

  const enable = () => {
    interact((interactRef.current as unknown) as HTMLElement)
      .dropzone({
        accept: '.draggable',
        overlap: 0.5
      })
      .on("dropactive",  (event : Interact.InteractEvent)  => {
        console.log("drop active");
        event.target.classList.add("drop-active");
      })
      .on("dragenter", (event: Interact.InteractEvent) => {
        // 重なったことの検知
        console.log("dragenter");
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;
        dropzoneElement.classList.add("drop-target");
        draggableElement?.classList.add("can-drop");
        console.log(dropzoneElement);
        if (draggableElement) {
          draggableElement.style.color = "#fff";
          draggableElement.textContent = "重複";
        }
      })
      .on("dragleave", (event: Interact.InteractEvent) => {
        console.log("dragleave");
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;
        dropzoneElement.classList.remove("drop-target");
        draggableElement?.classList.remove("can-drop");
        if (draggableElement) {
          draggableElement.textContent = "解除";
        }
      })

      .on("drop", (event: Interact.InteractEvent) => {
        // ドロップされた時の処理
        console.log("drop");
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        const transform = dropzoneElement.style.transform;
        const transformValues = transform.slice(transform.indexOf('(') + 1, transform.indexOf(')')).split(', ');

        const dropzonePositionX = transformValues ? parseFloat(transformValues[0]) : 0;
        const dropzonePositionY = transformValues ? parseFloat(transformValues[1]) : 0;
  
        console.log("drop x",dropzonePositionX);
        console.log("drop y",dropzonePositionY);
        if (draggableElement) {
          draggableElement.style.color = "#fff";
          draggableElement.textContent = "結合";
          // x += dropzoneElement.x
          // y += dropzoneElement.dy
        }
      })

      .on("dropdeactivate", (event: Interact.InteractEvent) => {
        console.log("drop deactivate");
        event.target.classList.remove("drop-active");
        event.target.classList.remove("drop-target");
      })
      
      .draggable({
        inertia: false,
        modifiers: [
            interact.modifiers.restrictRect({
              restriction: 'parent', // 親要素内に制限
              // endOnly: true
            })
        ],
        onstart: () => {
          setZIndex(1000); // ドラッグ開始時にz-indexを最前面に設定
        },
        onend: () => {
          setZIndex(1); // ドラッグ終了時にz-indexを元に戻す
        }
      })
      .on('dragmove', event => {
        x += event.dx
        y += event.dy
        setPosition({
          width,
          height,
          x,
          y
        })
      })
  }

  const disable = () => {
    interact((interactRef.current as unknown) as HTMLElement).unset()
  }

  useEffect(() => {
    if (isEnabled) {
      enable()
    } else {
      disable()
    }
    return disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled])

  return {
    ref: interactRef,
    style: {
      transform: `translate3D(${_position.x}px, ${_position.y}px, 0)`,
      width: _position.width + 'px',
      height: _position.height + 'px',
      position: 'absolute' as CSSProperties['position'],
      zIndex: zIndex
    },
    position: _position,
    isEnabled,
    enable: () => setEnable(true),
    disable: () => setEnable(false)
  }
}
