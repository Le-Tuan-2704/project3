export default function logout(){
    localStorage.clear();
    console.log("cliasdk");
    return(
        <Redirect to="/login"/>
    )
}

import React from 'react';
import { Navigate } from 'react-router-dom';

class MyComponent extends React.Component {
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Navigate to='/target' />
    }
  }
  render () {
    return (
       <div>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Redirect</button>
       </div>
    )
  }
}