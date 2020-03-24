import IGridColumn from "../IGridColumn";

export interface IDraggableItem extends IGridColumn {
  type: string;
  dragIndex: number;
}
