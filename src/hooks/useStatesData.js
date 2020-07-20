import {useState, useEffect} from 'react'
import Axios from 'axios'

const useStatesData = () => {
  const [data, setData] = useState({})
  useEffect(() => {
		const CancelToken = Axios.CancelToken,
			source = CancelToken.source()

		// * Declaring function inside useEffect to avoid dependencies error
		const loadData = async () => {
			try {
				const { data } = await Axios.get('/api/data')
				setData(data)
			} catch (err) {
				if (Axios.isCancel(err)) {
					console.log('Cancelled')
				} else {
					throw err
				}
			}
		}
		// * Calling loadData function
		loadData()
		return () => {
			// * Acts like componentWillUnmount. Cancelling axios call avoids memory leaks
			source.cancel()
		}
  }, [])
  
  return data
}

export default useStatesData