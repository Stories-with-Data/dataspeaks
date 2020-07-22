import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import SelectField from '@material-ui/core/SelectField';
import MenuItem from '@material-ui/core/menuItem';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

const useStyle = makeStyles({
  table: {
    margin: 20,
  }
})

function GetInvolvedFromNav (props) {

  const [senatorData, setSenatorData] = useState([])
  const [search, setSearch] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('https://api.propublica.org/congress/v1/116/senate/members.json', {
      headers: {
        'X-API-KEY': 'sTgSE1HxTFvOD7NVYqQFCt32afEhu0ApzxLf4uav'
      } 
    })
    .then(res => {
      setSenatorData(res.data.results[0].members)
      setIsLoading(false)
    })

  }, [])


  return (
    <TableContainer component={Paper}>
      <SelectField 
        floatingLabelText='frequency'
        value={search}
        onChange={(e, i, v) => setSearch({v})}
        >
          <MenuItem value='last_name' primaryText='Last Name'/>
          <MenuItem value='first_name' primaryText='First Name'/>
          <MenuItem value='state' primaryText='State'/>
          <MenuItem value='twitter_account' primaryText='Twitter'/>
          <MenuItem value='facebook_account' primaryText='Facebook'/>
          <MenuItem value='youtube_account' primaryText='Youtube'/>
        </SelectField>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell>Last Name</TableCell>
            <TableCell align='right'>First Name</TableCell>
            <TableCell align='right'>State</TableCell>
            <TableCell align='right'>Twitter</TableCell>
            <TableCell align='right'>Facebook</TableCell>
            <TableCell align='right'>Youtube</TableCell>
            <TableCell align='right'>Contact Form</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {senatorData.map(elem => {
            return (
              <TableRow key={elem.id}>
                <TableCell component='th' scope='row'>
                  {elem.last_name}
                </TableCell>
                <TableCell align='right'>{elem.first_name}</TableCell>
                <TableCell align='right'>{elem.state}</TableCell>
                <TableCell align='right'>{elem.twitter_account}</TableCell>
                <TableCell align='right'>{elem.facebook_account}</TableCell>
                <TableCell align='right'>{elem.youtube_account}</TableCell>
                <TableCell align='right'>Contact</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default GetInvolvedFromNav