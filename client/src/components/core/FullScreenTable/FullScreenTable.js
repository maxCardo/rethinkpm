import React, { useRef, useEffect, useState } from 'react'
import Table from '../Table';
import {useWindowSize} from "../../../util/commonFunctions";

const FullScreenTable = (props) => {
  const container = useRef(null)
  const [pageSize, setPageSize] = useState(10)
  const [refreshCounter, setRefreshCounter] = useState(0)
  const screen = useWindowSize();
  const clientHeight = container.current && container.current.clientHeight;
  useEffect(() => {
    console.log('enters')
    if(container.current) {
      const containerHeight = clientHeight;
      const rowNumber = Math.floor(containerHeight / 48);
      setPageSize(rowNumber)
      // When the screen is too big to fit the table and does scrolling we reset the table size and recalculate the pagesize
      if(screen.height < containerHeight) {
        setPageSize(1)
        setRefreshCounter(counter => (counter + 1))
      }
    }
  }, [container, clientHeight, screen.height]);

  return (
    <div style={{flex: 1}} ref={container}>
      <Table 
        {...props}
        pageSize={pageSize}
      />
    </div>
  )
}

export default FullScreenTable;