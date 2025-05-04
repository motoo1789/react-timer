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
  public isDragGroup = (draggable: string) => {
    return this.group === draggable || false;
  };

  /**
   * ドラッグされた要素がグループにあるか判定
   * @param {string} draggable
   * @returns boolean | string
   */
  public canRemoveTimerBlock = (draggable: string) => {
    return this.group !== draggable
      ? new Group(this.group)
      : false;
  };
}
