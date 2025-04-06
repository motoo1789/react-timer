export type ParentChild = {
  id: string;
  order: number;
};

export type Position = {
  top: number;
  left: number;
};

export type Timer = {
  position: Position;
  parentChild: ParentChild;
};

export interface UpdatePositionEvent {
  delta: {
    x: number;
    y: number;
  };
  over: {
    id: string;
  };
  active: {
    id: string;
  };
}
