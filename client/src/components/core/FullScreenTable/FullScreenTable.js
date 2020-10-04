import React, { useRef, useEffect, useState } from 'react'
import Table from '../Table';
import {useWindowSize} from "../../../util/commonFunctions";

const FullScreenTable = (props) => {
  const container = useRef(null)
  const [pageSize, setPageSize] = useState(10)
  const [refreshCounter, setRefreshCounter] = useState(0)
  const screen = useWindowSize();
  useEffect(() => {
    if(container.current) {
      const containerHeight = container.current.clientHeight
      console.log(`screen: ${screen.height} - container: ${containerHeight}`)
      const rowNumber = Math.floor(containerHeight / 48);
      setPageSize(rowNumber)
      if(screen.height < containerHeight) {
        setPageSize(1)
        setRefreshCounter(refreshCounter + 1)
      }
    }
  }, [container.current, container.current && container.current.clientHeight, refreshCounter]);

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