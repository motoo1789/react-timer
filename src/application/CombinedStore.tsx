import { DropBlock, DragBlock } from './TimerBlocksApplicationService';

type Listener = () => void;

let listeners: Listener[] = [];
let cachedSnapshot: object | null = null; // キャッシュ用の変数

export const CombinedStore = {
  subscribe(listener: Listener): () => void {
    listeners.push(listener);

    // DropBlockとDragBlockのリスナーを登録
    const unsubscribeDropBlock = DropBlock.subscribe(() => {
      listeners.forEach((l) => l());
    });
    const unsubscribeDragBlock = DragBlock.subscribe(() => {
      listeners.forEach((l) => l());
    });

    // リスナー解除
    return () => {
      listeners = listeners.filter((l) => l !== listener);
      unsubscribeDropBlock();
      unsubscribeDragBlock();
    };
  },

  getSnapshot() {
    // DropBlockとDragBlockのデータを統合
    const dropSnapshot = DropBlock.getSnapshot();
    const dragSnapshot = DragBlock.getSnapshot();

    const newSnapshot = {
      ...dropSnapshot,
      // ...dragSnapshot,
    };

    // キャッシュされたスナップショットと比較
    if (JSON.stringify(newSnapshot) === JSON.stringify(cachedSnapshot)) {
      return cachedSnapshot; // キャッシュを返す
    }

    // キャッシュを更新
    cachedSnapshot = newSnapshot;
    return cachedSnapshot;
  },
};