import * as React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import RootRoute from "@repo/project/src/ui/routes/Root";

interface IAppProps {
  initialState?: any;
  history?: any;
}

const App = (props: IAppProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <RootRoute />
    </DndProvider>
  );
};

export default App;
