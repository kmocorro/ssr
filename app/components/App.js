import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Home from './Home'
import RMP from './RMP'

export default () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/uploader/rmp" component={RMP}/>
            </Switch>
        </div>
    )
}