import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useStatesData from '../../hooks/useStatesData'
import MaterialTable from 'material-table'
// import State from '../State/State'
// import stateFlags from '../../assets/stateFlags/stateFlags.json'

const StateRankTable = () => {
	const data = useStatesData()
	const history = useHistory()

	const [isLoading, setIsLoading] = useState(true)
	const columns = [
		{
			title: 'State',
			field: 'overall.stateName'
		},
		{
			title: 'Overall Rank',
			field: 'overall.rank'
		},
		{
			title: 'IAT',
			field: 'overall.ranks.iatRank'
		},
		{
			title: 'Arrest Rate',
			field: 'overall.ranks.arRank'
		},
		{
			title: 'CIR',
			field: 'overall.ranks.cirRank'
		},
		{
			title: 'Black Pop',
			field: 'overall.ranks.bpRank',
			tooltip: `State's rank based on 2019 Census Black or African American population`
		}
	]

	useEffect(() => {
		if (Object.keys(data).length) {
			setIsLoading(false)
		}
	}, [data])

	return (
		<>
			<MaterialTable
				data={Object.values(data)}
				columns={columns}
				isLoading={isLoading}
				options={{
					pageSize: 50,
					pageSizeOptions: [10, 25, 50]
				}}
				title=''
				onRowClick={(event, rowData) => {
					history.push(
						`/states/${rowData.overall.stateName}`
					)
				}}
				// detailPanel={[
				// 	{
				// 		tooltip: 'IAT',
				// 		render: rowData => (
				// 			<MaterialTable
				//         data={data[rowData.overall.stateName].categories[0].data[0].data}
				//         columns={[
				//           {
				//             title: 'Race',
				//             field: 'race'
				//           },
				//           {
				//             title: 'IAT Score',
				//             field: 'value'
				//           }
				//         ]}
				// 			/>
				// 		)
				// 	}
				// ]}
			/>
		</>
	)
}

export default StateRankTable
