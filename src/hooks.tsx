import { useRef, useEffect, useState, CSSProperties } from 'react'
import interact from 'interactjs'

type Partial<T> = {
  [P in keyof T]?: T[P]
}

const initPosition = {
  width: 100,
  height: 100,
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
  let { x, y, width, height } = _position

  const enable = () => {
    interact((interactRef.current as unknown) as HTMLElement)
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
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },
        preserveAspectRatio: false,
        inertia: false,
        modifiers: [
            interact.modifiers.restrictEdges({
              outer: 'parent' // 親要素内に制限
            })
          ],
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
      .on('resizemove', event => {
        width = event.rect.width
        height = event.rect.height
        x += event.deltaRect.left
        y += event.deltaRect.top
        setPosition({
          x,
          y,
          width,
          height
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
