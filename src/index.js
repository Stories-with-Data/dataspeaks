import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
	unstable_createMuiStrictModeTheme,
	ThemeProvider
} from '@material-ui/core/styles'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'

const theme = unstable_createMuiStrictModeTheme({
	spacing: 8,
	palette: {
		primary: {
			main: '#FCE21B'
		},
		secondary: {
			main: '#3747C4'
		},
		type: 'dark'
	}
})

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
