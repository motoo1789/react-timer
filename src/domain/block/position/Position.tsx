import { Top } from "./Top";
import { Left } from "./Left";

export class Position {
  private top: Top;
  private left: Left;

  constructor(top: Top, left: Left) {
    this.top = top;
    this.left = left;
  }

  getPosition() : {top: number, left: number} {
    return { top: this.top.getTop(), left: this.left.getLeft() };
  }
}
