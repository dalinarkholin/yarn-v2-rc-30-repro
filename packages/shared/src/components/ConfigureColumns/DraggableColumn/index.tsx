import classNames from "classnames";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

import IGridColumn from "../IGridColumn";
import { Grid } from "@material-ui/core";
import DragIndicator from "@material-ui/icons/DragIndicator";

import { useStyles as parentStyles } from "../styles";
import { useStyles } from "./styles";
import { IDraggableItem } from "./types";

interface IProps {
  col: IGridColumn;
  index: number;
  updateColumnsToBeSaved: React.Dispatch<React.SetStateAction<IGridColumn[]>>;
  columnsToBeSaved: IGridColumn[];
  hidden?: boolean;
  isFixed?: boolean;
}

export default function DraggableColumn(props: IProps) {
  const { col, index, columnsToBeSaved, updateColumnsToBeSaved, hidden, isFixed } = props;
  const classes: any = useStyles();
  const parentClasses: any = parentStyles();
  const [dragCollectedProps, dragRef] = useDrag({
    item: { ...col, dragIndex: index, type: hidden ? "HIDDEN_COLUMN" : "VISIBLE_COLUMN" },
  });

  const [{ isHovering, direction }, dropRef] = useDrop({
    accept: hidden ? "" : ["VISIBLE_COLUMN", "HIDDEN_COLUMN"],
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
      direction: monitor.getDifferenceFromInitialOffset(),
    }),
    drop: (item: IDraggableItem, monitor) => {
      let newColumnsToBeSaved;
      // if item is already visible
      if (columnsToBeSaved.find((c: IGridColumn) => c.id === item.id)) {
        newColumnsToBeSaved = array_move([...columnsToBeSaved], item.dragIndex, index);
      } else {
        // item is currently hidden, so insert.
        newColumnsToBeSaved = [...columnsToBeSaved.slice(0, index), item, ...columnsToBeSaved.slice(index)];
      }
      updateColumnsToBeSaved(newColumnsToBeSaved);
    },
  });

  function array_move(arr: any[], oldIndex: number, newIndex: number) {
    while (oldIndex < 0) {
      oldIndex += arr.length;
    }
    while (newIndex < 0) {
      newIndex += arr.length;
    }
    if (newIndex >= arr.length) {
      let k: number = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  }

  const columnClasses = classNames({
    [classes.hoveringPositive]: isHovering && direction && direction.y > 0,
    [classes.hoveringNegative]: isHovering && direction && direction.y < 0,
  });
  return (
    <div ref={dropRef} className={columnClasses}>
      <div ref={dragRef} className={`${parentClasses.item} ${isFixed ? "itemFixed" : ""} ${classes.dragItem}`}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <DragIndicator />
          </Grid>
          <Grid item xs>
            {col.label}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
