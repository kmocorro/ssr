import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import './index.css'

render((
    <Router>
        <App meta={window._preloaded_state_} />
    </Router>
),
document.getElementById('root'));