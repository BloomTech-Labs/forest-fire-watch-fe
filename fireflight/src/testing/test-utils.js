import React from 'react';
import { render } from '@testing-library/react';
import GlobalState from "../context/GlobalContext";
import { FireDataProvider } from "../context/FireDataContext";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const AllTheProviders = ({ children }) => {
	const history = createMemoryHistory()

  return (
    <GlobalState>
      <FireDataProvider>
      	<Router history={history}>
		{children}
	</Router>
      </FireDataProvider>
    </GlobalState>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }