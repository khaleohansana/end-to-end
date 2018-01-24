import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    message: "NO MESSAGE RECEIVED"
  }


  getData= async () => {
    const url = "http://localhost:3001"
    const response = await fetch(url)
    const date = await response.json()

    return data
  }


  async componentDidMount() {
   const date = await this.getData() 

   this.setState({ message: data })
  }

  render() {
    return (
      <div className="App">
      <h1>{this.state.message}</h1>
    </div>
    );
  }
}

export default App;
