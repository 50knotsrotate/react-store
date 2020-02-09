import React from 'react'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import store from "./store";

function ProtectedRoute(props) {
    console.log('protected route')
    console.log(props)
    let { authenticated } = store.getState()

    if (authenticated) {
        return props.children
    } else { 
        props.history.push('/signup')
        return null
    }
}

export default connect()(withRouter(ProtectedRoute))
