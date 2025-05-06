import { Position } from "./position/Position";
import { ParentChild } from "./parent_child/ParentChild";
import { BlockId } from "./BlockId"; // Import BlockId
import { Block } from "./Block";
import { PositionFactory } from "./position/PositionFactory";
import { ParentChildFactoryFactory } from "./parent_child/ParentChildFactory";
import { Order } from "./parent_child/Order";

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

  static removedGroupBlock(block: Block, draggableDeltaTop: number, draggableDeltaLeft: number): Block {
    const HIGHT = 50;
    const prevPosition: Position = block.getPosition();
    const prevOrder: Order = block.getOrder();

    const deltaTop = HIGHT * prevOrder.getOrderValue() + draggableDeltaTop;
    const newPosition: Position = block.getPosition().update(deltaTop, draggableDeltaLeft);

    return new Block(
      block.getBlockId(),
      newPosition,
      ParentChildFactoryFactory.createParentChild(block.getBlockId().getId(), 0)
    );
  }
}
