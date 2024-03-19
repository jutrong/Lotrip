import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'
import { RecoilRoot } from 'recoil'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Global styles={globalStyles} />
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

reportWebVitals()
