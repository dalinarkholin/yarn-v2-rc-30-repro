import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  tableSettingsButton: {
    position: "absolute",
    right: "0px",
    top: "0px",
    zIndex: 1,
    backgroundColor: "white",
    height: "49px",
    width: "49px",
    boxShadow: "-5px 0 5px -5px rgba(0,0,0,0.2)",
  },
  removeBorderRadius: {
    borderRadius: "0px",
  },
  dialogContainer: {
    backgroundColor: "#f7f7f7",
  },
  itemHeader: {},
  item: {
    padding: "15px 24px",
    margin: "0px -24px",
  },
  configColHeader: {
    width: "300px",
  },
  dialogTitle: {
    backgroundColor: "#f7f7f7",
  },
});
