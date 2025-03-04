import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root')!)

root.render(
	'is_dev' ? (
		<StrictMode>
			<></>
		</StrictMode>
	) : (
		<></>
	),
)
