import React, { Component } from 'react'
import { connect } from "react-redux";
import store from '../../store';

class Cart extends Component {
    constructor() {
        super()
        
        this.state = {

        }
    }
    
    componentDidMount() { 
        const ah = store.getState()
        console.log('yo')
        console.log(ah)
    }
    render() {
        return (
            <div>
                Cart
            </div>
        )
    }
}

// function Cart() { 
//     const ah = store.getState();
//     console.log('storey time')
//     console.log(ah)
//     return <p>Cart</p>
// }

export default connect()(Cart)
