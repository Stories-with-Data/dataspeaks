import React, {useEffect, useState} from 'react'
import Axios from 'axios'

// this component needs stateName to passed into it as a prop. this should be the only prop needed.

function GetInvolved(props) {
  const [senators, setSenators] = useState([])

  useEffect(() => {
    if(props.stateName){
      getMemberData()
    }
  }, [props])

  async function getMemberData() {
    const res = await Axios.get('https://api.propublica.org/congress/v1/116/senate/members.json', {
      headers: {
        'X-API-KEY': 'sTgSE1HxTFvOD7NVYqQFCt32afEhu0ApzxLf4uav'
      }
    })

    const response = await Axios.get(`/api/states/${props.stateName}`)
    const senateList = res.data.results[0].members
    for(let i = senateList.length - 1; i >= 0; i--){
      if(senateList[i].state !== response.data.state_abv){
        senateList.splice(i, 1)
      }
    }
    setSenators(senateList)
  }

  const senatorsMap = senators.map(elem => {
    console.log(senators)
    return (
      <div className='senator-container'
      key={elem.id}>
        {elem.first_name}
      </div>
    )
  })

  return (
    <div className='get-involved-container'>
      {`Meet the U.S senators for ${props.stateName}`}
      {senatorsMap}
    </div>
  )
}

export default GetInvolved