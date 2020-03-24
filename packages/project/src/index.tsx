import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "core-js/stable";
import "regenerator-runtime/runtime";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

const init = async () => {
  const App = await import("./ui/App");

  const rootDOMElement = document.getElementById("app");
  const render = (AppComponent: any) => {
    ReactDOM.render(
      <AppContainer>
        <AppComponent />
      </AppContainer>,
      rootDOMElement,
    );
  };

  render(App.default);

  if ((module as any).hot) {
    (module as any).hot.accept("./ui/App", () => {
      const NextApp = require("./ui/App").default; // tslint:disable-line no-var-requires
      render(NextApp);
    });
  }
};

init();
