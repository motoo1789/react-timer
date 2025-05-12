export class Group {
  private readonly group: string;

  constructor(group: string) {
    this.group = group;
  }

  /**
   * ドラッグされた要素ブロックのグループか判定
   * @param {string} draggable
   * @returns boolean
   */
  public isDragGroup = (handlerGruop: string) => {
    return this.group === handlerGruop || false;
  };

  /**
   * 新しいOrderを生成する(穴埋め)
   * @returns void
   */
  public canRemoveTimerBlock = (draggable: string) => {
    return this.group !== draggable
      ? this.group
      : false;
  };

  public grouping = (parent: Group): Group => {
    return new Group(parent.getGroupValue());
  }
  public getGroupValue(): string {
    return this.group;
  }

  public getGroup(): Group {
    return this;
  }
}
