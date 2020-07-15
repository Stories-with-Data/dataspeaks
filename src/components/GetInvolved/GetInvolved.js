import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function GetInvolved(props) {
  const [senators, setSenators] = useState()

  useEffect(() => {
    getMemberData()
  }, [props])

  async function getMemberData() {
    const res = await Axios.get('https://api.propublica.org/congress/v1/116/senate/members.json', {
      headers: {
        'X-API-KEY': 'sTgSE1HxTFvOD7NVYqQFCt32afEhu0ApzxLf4uav'
      }
    })
    const senateList = res.data.results[0].members
    for(let i = senateList.length - 1; i >= 0; i--){
      if(senateList[i].state !== props.stateAbv){
        senateList.splice(i, 1)
      }
    }
    console.log(senateList)
  }

  return (
    <h1>Get Involved Page</h1>
  )
}

export default GetInvolved