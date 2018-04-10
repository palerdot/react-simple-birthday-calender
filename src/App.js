import React, { Component } from 'react'
import './App.css'

// import components
import Calender from './components/Calender'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Simple Birthday Calender</h1>
        </header>
        <div className="App-intro">
          <Calender />
        </div>
      </div>
    );
  }
}

export default App
