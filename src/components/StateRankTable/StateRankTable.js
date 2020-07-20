import React, {useState, useEffect} from 'react'
import useStatesData from '../../hooks/useStatesData'
import MaterialTable from 'material-table'

const StateRankTable = () => {
  const data = useStatesData()

  const [isLoading, setIsLoading] = useState(true)
  
  const columns = [
    {
      title: 'State',
      field: 'overall.statesName'
    },
    {
      title: 'Overall Rank',
      field: 'overall.rank'
    }
  ]
  
  useEffect(() => {
    if(Object.keys(data).length) {
      setIsLoading(true)
    }
  }, [data])

  return (
    <>
      <MaterialTable 
        data={data}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  )
}

export default StateRankTable