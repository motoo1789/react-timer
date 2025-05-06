import { Top } from "./Top";
import { Left } from "./Left";

export class Position {
  private top: Top;
  private left: Left;

  constructor(top: Top, left: Left) {
    this.top = top;
    this.left = left;
  }

  getPosition() : Position {
    return this;
  }


  update(deltaTop: number, deltaLeft: number) : Position{
    return new Position(this.top.update(deltaTop), this.left.update(deltaLeft));
  }


}
