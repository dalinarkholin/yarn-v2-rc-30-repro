import * as React from "react";
import ConfigureColumns from "@repo/shared/src/components/ConfigureColumns";

export default function Root() {
  return (
    <div>
      <ConfigureColumns
        savedColumns={[
          {
            id: 1,
            label: "bob",
            orderBy: "string",
            width: 30,
          },
        ]}
        headerData={[
          {
            id: 1,
            label: "bob",
            orderBy: "someString",
            width: 30,
          },
        ]}
        updateGridSettings={(params: any) => console.log("hello")}
        gridType="someString"
      />
    </div>
  );
}
