import React from 'react'
import { Provider } from 'react-redux'
import { Container, CssBaseline } from '@material-ui/core';
import configureStore from './configureStore'
import HomePage from './Pages/Home'

const { store } = configureStore()

const App = () => (
  <Provider store={store}>
    <CssBaseline />
    <Container maxWidth="xl">
      <HomePage />
    </Container>
  </Provider>
);

export default App;