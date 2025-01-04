import React, { useState } from "react";
import Konva from 'konva'; 
import { Stage, Layer, Rect, Text, Group } from "react-konva";

type Block = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: number;
};

export const KonvaTest = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  // ブロックを追加
  const addBlock = () => {
    setBlocks((prevBlocks:any) => [
      ...prevBlocks,
      {
        x: Math.random() * 400,
        y: Math.random() * 400,
        width: 100,
        height: 100,
        fill: "green",
        id: Date.now(),
      },
    ]);
  };

  // ドラッグ後の位置を更新
  const handleDragEnd = (e : Konva.KonvaEventObject<DragEvent>, id : number) => {
    const { x, y } = e.target.position();
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, x, y } : block
      )
    );
  };

  // ボタンのクリックイベント
  const handleButtonClick = (id : number) => {
    alert(`Button in block ${id} clicked!`);
  };

  return (
    <div>
      <button onClick={addBlock}>Add Block</button>
      <Stage width={800} height={600}>
        <Layer>
          {blocks.map((block) => (
            <Group
              key={block.id}
              draggable
              x={block.x}
              y={block.y}
              onDragEnd={(e) => handleDragEnd(e, block.id)}
            >
              {/* ブロック本体 */}
              <Rect
                width={block.width}
                height={block.height}
                fill={block.fill}
                cornerRadius={10}
              />
              {/* ボタン */}
              <Group
                x={block.width / 4}
                y={block.height / 2}
                onClick={() => handleButtonClick(block.id)}
              >
                <Rect
                  width={block.width / 2}
                  height={30}
                  fill="blue"
                  cornerRadius={5}
                  shadowBlur={5}
                />
                <Text
                  text="Click Me"
                  fontSize={16}
                  fill="white"
                  align="center"
                  verticalAlign="middle"
                  width={block.width / 2}
                  height={30}
                />
              </Group>
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
