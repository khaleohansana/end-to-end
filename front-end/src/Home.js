import React, {Component} from 'react'

export default class Home extends Component {

state = {
    cars: []
  }

  getData = async (path) => {
    const url = `http://localhost:3001${path}`
    const response = await fetch(url)
    const data = await response.json()

    return data
  }

  displayCars = (cars) => {
    const carElements = []
    for (const car of cars) {
      carElements.push(
      <div>
        <h1>{car.make}</h1>
        <h2>{car.model}</h2>
        <h3>{car.year}</h3>
        <h4>{car.mileage}</h4>
      </div>)
    }
    return carElements
  }

  async componentDidMount() {
    const carsResponse = await this.getData("/cars")
    console.log("ServerData:", carsResponse)
    this.setState({ cars: carsResponse.cars })
  }
  render() {
      return (
          <div>
            {this.displayCars(this.state.cars)}
        </div>
      )
  }

}
