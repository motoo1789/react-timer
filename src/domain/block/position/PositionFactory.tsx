import { Position } from "./Position";
import { Top } from "./Top";
import { Left } from "./Left";

export class PositionFactory {
  static createPosition(top: number, left: number): Position {
    return new Position(new Top(top), new Left(left));
  }
}
