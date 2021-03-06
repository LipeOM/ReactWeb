import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { auth } from './base'
import Processos from './Processos'

class AdminPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthing: true,
      isLoggedIn: false,
      user: null
    }
    
    this.handleExit = this.handleExit.bind(this)
  }

  componentWillMount() {
    this.removeAuthListener = auth.onAuthStateChanged(user => {
      this.setState({
        isAuthing: false,
        isLoggedIn: !!user,
        user: user
      })
    })
  }


  handleExit() {
    auth.signOut()
  }

  componentWillUnmount() {
    this.removeAuthListener()
  }

  render() {
    console.log(this.props.match.url)
    if (this.state.isAuthing) {
      return <p>Aguarde...</p>
    }

    if (!this.state.isLoggedIn) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        <h1>Admin Page</h1>
        
        <Route path={ `${this.props.match.url}/processos`} component={ Processos } />
        <button onClick={this.handleExit.bind(this)}>Sair</button>
      </div>
    )
  }
}

export default AdminPage