import { useState, useEffect } from 'react'

const useWindowSize = () => {
	// const isClient = typeof window === 'object'

	const [windowSize, setWindowSize] = useState({ height: 0, width: 0 })

	useEffect(() => {
		// if (!isClient) {
		// 	return false
		// }

		const getSize = () => ({
			width: window.innerWidth,
			height: window.innerHeight
		})

		setWindowSize(getSize())

		const handleResize = () => {
			setWindowSize(getSize())
		}
		const addListener = () => {
			window.addEventListener('resize', handleResize)
		}

		addListener()

		return () => window.removeEventListener('resize', handleResize)
	}, []) // Empty array ensures that effect is only run on mount and unmount

	return windowSize
}

export default useWindowSize