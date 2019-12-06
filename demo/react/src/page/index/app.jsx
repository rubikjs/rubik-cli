import React, { Component } from 'react'
import logo from './logo.svg'
import './app.css'

function annotation (target) {
  target.annotated = true
}

@annotation
class App extends Component {
  state = {
    type: '',
    action: ''
  }

  componentDidMount () {
    console.log(111, this.constructor.annotated)
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <div
            className='App-logo'
            dangerouslySetInnerHTML={{
              __html: logo
            }}
          />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
