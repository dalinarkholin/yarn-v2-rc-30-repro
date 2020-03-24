import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Slider } from "@material-ui/core";
import { Close, Settings } from "@material-ui/icons";
import IGridColumn from "./IGridColumn";

import DraggableColumn from "./DraggableColumn";
import { IDraggableItem } from "./DraggableColumn/types";
import { useStyles } from "./styles";

interface IProps {
  savedColumns?: IGridColumn[];
  headerData: IGridColumn[];
  updateGridSettings: (params: any) => void;
  gridType: string;
  initialFixedColumnCount?: number;
}

export default function ConfigureColumns(props: IProps) {
  const classes: any = useStyles();
  const { savedColumns, headerData, updateGridSettings, gridType, initialFixedColumnCount = 0 } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [columnsToBeSaved, updateColumnsToBeSaved] = useState(headerData);
  const [fixedColumnCount, setFixedColumnCount] = useState(initialFixedColumnCount);

  useEffect(() => {
    if (savedColumns) {
      // update to savedColumns once hydrated
      updateColumnsToBeSaved(savedColumns);
    }
  }, [savedColumns]);

  useEffect(() => {
    setFixedColumnCount(initialFixedColumnCount);
  }, [initialFixedColumnCount]);

  const handleSaveGridSettings = () => {
    setDialogOpen(false);
    updateGridSettings({
      body: {
        gridId: gridType,
        columns: columnsToBeSaved.map((col: IGridColumn) => ({ id: col.id })),
        fixedColumnsCount: fixedColumnCount,
      },
    });
  };

  const handleClose = () => {
    setDialogOpen(false);
    updateColumnsToBeSaved(savedColumns || headerData);
  };

  const handleReset = () => {
    updateColumnsToBeSaved(headerData);
  };

  const hiddenColumns = () => {
    if (columnsToBeSaved) {
      const hiddenCols = headerData.filter(
        (col: IGridColumn) => !columnsToBeSaved!.find((savedCol: IGridColumn) => savedCol.id === col.id),
      );
      return hiddenCols;
    }
    return [];
  };

  const [{ isHovering, direction }, hiddenDropRef] = useDrop({
    accept: "VISIBLE_COLUMN",
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
      direction: monitor.getDifferenceFromInitialOffset(),
    }),
    drop: (item: IDraggableItem, monitor) => {
      const newColumnsToBeSaved = [...columnsToBeSaved].filter((col) => col.id !== item.id);
      updateColumnsToBeSaved(newColumnsToBeSaved);
    },
  });

  return (
    <>
      <div className={classes.tableSettingsButton}>
        <IconButton onClick={() => setDialogOpen(true)} classes={{ root: classes.removeBorderRadius }}>
          <Settings />
        </IconButton>
      </div>
      <Dialog open={dialogOpen} maxWidth="sm">
        <div className={classes.dialogContainer}>
          <DialogTitle className={classes.dialogTitle}>
            <Grid container alignContent="center" alignItems="center">
              <Grid item xs className={classes.configColHeader}>
                Configure Columns
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleClose()} edge="end">
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent style={{ maxHeight: "735px" }}>
            <div style={{ paddingTop: "10px" }}>
              <div style={{ borderBottom: "none" }} className={classes.item}>
                <div className={classes.itemHeader}>Fixed Columns</div>
              </div>
              <Slider
                valueLabelDisplay="off"
                defaultValue={0}
                step={1}
                max={5}
                value={fixedColumnCount}
                marks={[
                  { label: 0, value: 0 },
                  { label: 1, value: 1 },
                  { label: 2, value: 2 },
                  { label: 3, value: 3 },
                  { label: 4, value: 4 },
                  { label: 5, value: 5 },
                ]}
                onChange={(e: any, val: any) => {
                  setFixedColumnCount(val);
                }}
              />
            </div>
            <div className={classes.item}>
              <div className={classes.itemHeader}>Visible Columns ({columnsToBeSaved.length})</div>
            </div>
            {savedColumns
              ? columnsToBeSaved.map((col: IGridColumn, index: number) => (
                  <DraggableColumn
                    key={col.id}
                    {...{ col, index, columnsToBeSaved, updateColumnsToBeSaved, isFixed: index === fixedColumnCount }}
                  />
                ))
              : headerData.map((col: IGridColumn, index: number) => (
                  <DraggableColumn
                    key={col.id}
                    {...{ col, index, columnsToBeSaved, updateColumnsToBeSaved, isFixed: index === fixedColumnCount }}
                  />
                ))}
            <div ref={hiddenDropRef} style={isHovering ? { paddingBottom: "30px" } : undefined}>
              <div className={classes.item}>
                <div className={classes.itemHeader}>Hidden Columns ({hiddenColumns().length})</div>
              </div>
              {hiddenColumns().map((col: IGridColumn, index: number) => (
                <DraggableColumn key={col.id} {...{ col, index, columnsToBeSaved, updateColumnsToBeSaved }} hidden />
              ))}
            </div>
            {/* {savedColumns
      ? headerData.filter((col: IGridColumn) => (savedColumns as IGridColumn[]).find((cool))).map((col: IGridColumn) => <div key={col.orderBy}>{col.label}</div>)
      : null} */}
          </DialogContent>
          <DialogActions>
            <Grid container justify="flex-end" alignContent="center" spacing={1}>
              <Grid item>
                <Button onClick={() => handleReset()} variant="text" color="default">
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => handleClose()} variant="text" color="default">
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => handleSaveGridSettings()}
                  disabled={!columnsToBeSaved.length}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
