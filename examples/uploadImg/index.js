import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Editor from '../../src/index'

class App extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="app">
        <h1>Hello, here is tim huang!</h1>
        <Editor />
      </div>
    )
  }
}

ReactDOM.hydrate(<App />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept();
}