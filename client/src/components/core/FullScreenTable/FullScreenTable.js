import React, { useRef, useEffect, useState } from "react";
import Table from "../Table";
import { useWindowSize } from "../../../util/commonFunctions";

const FullScreenTable = (props) => {
  const container = useRef(null);
  const [pageSize, setPageSize] = useState(10);
  const screen = useWindowSize();

  useEffect(() => {
    if (container.current) {
      const containerHeight = container.current.clientHeight;
      const rowNumber = Math.floor(containerHeight / 48);

      setPageSize((prev) => (prev !== rowNumber ? rowNumber : prev));
    }
  }, [screen.height]);

  return (
    <div style={{ flex: 1 }} ref={container}>
      <Table {...props} pageSize={pageSize} />
    </div>
  );
};

export default FullScreenTable;
