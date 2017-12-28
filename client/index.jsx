import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './src/App.jsx'

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
  document.getElementById('root'))
}

render(App)

if (module.hot) {
  module.hot.accept('./src/App.jsx', () => { render(App) })
}