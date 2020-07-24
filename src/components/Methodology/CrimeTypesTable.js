import React from 'react'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'

const CrimeTypesTable = ({ tableClass }) => {
	const violentCrimes = `Burglary, Arson, Human Trafficking Commercial, Human Trafficking Servitude, Motor Vehicle Theft, Murder, Rape, Robbery, Sex Offenses, Simple Assault, Aggravated Assault`
  const nonViolent = `All Other Offenses, Curfew, Disorderly Conduct, Dui, Drug Grand Total, Drunkenness, Embezzlement, Forgery, Fraud, Gambling Total, Larceny, Liquor Laws, Offense Against Family, Prostitution, Prostitution Assisting, Prostitution Prostitution, Prostitution Purchasing, Runaway, Stolen Property, Suspicion, Vagrancy, Vandalism, Weapons`


	return (
		<TableContainer component={Paper}>
			<Table className={tableClass}>
				<TableHead>
					<TableRow>
						<TableCell>Violent Crimes</TableCell>
						<TableCell>Non-violent Crimes</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
          {nonViolent.split(',').map((e, i) => (
            <TableRow key={`${e}${i}`}>
              <TableCell>{violentCrimes.split(',')[i] || ''}</TableCell>
              <TableCell>{e}</TableCell>
            </TableRow>
          ))}
        </TableBody>
			</Table>
		</TableContainer>
	)
}

export default CrimeTypesTable
