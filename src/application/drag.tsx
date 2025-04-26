import { DndContext , DragMoveEvent} from "@dnd-kit/core";

const handleDrag = (event: DragMoveEvent): void => {
    console.log("drag drag");
    const draggable: string = event.active?.id as string;

    // グループがドラッグされた時
    if (canGroupDrag(draggable)) {
        console.log("group drag");
        const parentLeft: number = timers[draggable].position.left + event.delta.x;
        const parentTop: number = timers[draggable].position.top + event.delta.y;
        const position: Timers = Object.entries(timers)
            .filter(([id, value]: [string, Timer]) => value.parentChild.id === draggable)
            .filter(([id, value]: [string, Timer]) => id !== draggable)
            .reduce((acc: Timers, [id, value]: [string, Timer]) => {
                acc[id] = {
                    ...value,
                    position: {
                        left: parentLeft,
                        top: parentTop,
                    },
                };
                return acc;
            }, {} as Timers);

        setTimer((prev: Timers) => ({
            ...prev,
            ...position,
        }));
    }
};