export type ParentChildUI = {
  id: string;
  order: number;
};

export type PositionUI = {
  top: number;
  left: number;
};

export type TimerUI = {
  position: PositionUI;
  parentChild: ParentChildUI;
};
