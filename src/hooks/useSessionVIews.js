import { useState, useEffect } from 'react'
import Axios from 'axios'

const useSessionViews = () => {
	const [session, setSession] = useState({})

	useEffect(() => {
		const CancelToken = Axios.CancelToken,
			source = CancelToken.source()

		const getSession = async () => {
			try {
				const { data } = await Axios.get('/session')
				setSession(data)
			} catch (err) {
				if (Axios.isCancel(err)) {
					console.log('Cancelled')
				} else {
					throw err
				}
			}
		}

		getSession()

		return () => {
			// timeouts.forEach(to => clearTimeout(to))
			source.cancel()
		}
  }, [])
  
  return session
}

export default useSessionViews
