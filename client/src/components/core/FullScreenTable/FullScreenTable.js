import React, { useRef, useEffect, useState } from 'react'
import Table from '../Table';

const FullScreenTable = (props) => {
  const container = useRef(null)
  const [pageSize, setPageSize] = useState(10)
  useEffect(() => {
    if(container.current) {
      const containerHeight = container.current.clientHeight
      console.log(containerHeight)
      const rowNumber = Math.floor(containerHeight / 48);
      setPageSize(rowNumber)
    }
  }, [container.current, container.current && container.current.clientHeight]);

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