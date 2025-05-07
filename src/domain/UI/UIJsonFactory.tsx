import { ParentChildUI } from "../../type.tsx";
import { PositionUI } from "../../type.tsx";
import { Timer } from "../../type.tsx";
import { Block } from "../block/Block.tsx";

export const UIJsonFactory = (block: Block): Timer => {
  const position: PositionUI = block.getPosition().getUIUseJson();
  const parentChild: ParentChildUI = block.getParentChild().getUIUseJson();
  const blockId = block.getBlockId().getId();

  return {
    position: position,
    parentChild: parentChild,
  };
};
