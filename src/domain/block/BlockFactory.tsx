import { Position } from "./position/Position";
import { ParentChild } from "./parent_child/ParentChild";
import { BlockId } from "./BlockId"; // Import BlockId
import { Block } from "./Block";
import { PositionFactory } from "./position/PositionFactory";
import { ParentChildFactoryFactory } from "./parent_child/ParentChildFactory";


export class BlockFactory {
  static createBlock(
    id: string,
    top: number,
    left: number,
    group: string,
    order: number
  ): Block {
    const position: Position = PositionFactory.createPosition(top, left);
    const parentChild: ParentChild = ParentChildFactoryFactory.createParentChild(group,order);
    return new Block(
      new BlockId(id),
      position,
      parentChild
    );
  }
}
