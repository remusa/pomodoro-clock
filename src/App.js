import React, { Component } from 'react'
import './App.scss'

import PomodoroClock from './components/PomodoroClock'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PomodoroClock />
      </div>
    )
  }
}

export default App
