import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {formatMoney} from "../../../util/commonFunctions";

const KpiItem = ({title, endpoint}) => {
  const [actualNumber, setActualNumber] = useState(0)
  const [porcentualChange, setPorcentualChange] = useState(0)

  const fetchData = async (cancelToken) => {
    const response = await axios.get(endpoint, {cancelToken})
    const {actualNumber, porcentualChange} = response.data
    setActualNumber(actualNumber)
    setPorcentualChange(porcentualChange)
  }
  
  useEffect(() => {
    const source = CancelToken.source();
    fetchData(source.token)
    return () => {
      source.cancel('Component unmounted');
    }
  }, [endpoint])

  let variationBlock = ''
  if(porcentualChange > 0) {
    variationBlock = (
      <span className='kpi-item__variation kpi-item__positive-variation'>
        <i className="fas fa-long-arrow-alt-up"></i>
        {porcentualChange}%
      </span>
    )
  } else if(porcentualChange < 0) {
    variationBlock = (
      <span className='kpi-item__variation kpi-item__negative-variation'>
        <i className="fas fa-long-arrow-alt-down"></i>
        {porcentualChange * -1}%
      </span>
    )
  } else {
    variationBlock = (
      <span className='kpi-item__variation'>
        <i className="fas fa-long-arrow-alt-right"></i>
        {porcentualChange}%
      </span>
    )
  }
  return (
    <div className='kpi-item__container'>
      <p className='kpi-item__number'>
        {formatMoney(actualNumber)}
        {variationBlock}
      </p>
      <p className='kpi-item__title'>{title}</p>
    </div>
  )
}


export default KpiItem
