import React, {Component} from 'react'
export default class extends Component {
state = {
    cars: [],
    planes: []
  }

  getData = async (path) => {
    const url = `http://localhost:3001${path}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  renderCar = (car) => {
      return (
      <div key ={car._id}>
      <h1>{car.make.toUpperCase()}</h1>
      <h2>{car.model.toUpperCase()}</h2>
      <h3>{car.year}</h3>
      <h4>{car.mileage}</h4>
    </div>
    )
  }

  displayCars = (cars) => {
    const carElements = []
    for (const car of cars) {
      carElements.push(this.renderCar(car))
    }
    return carElements
  }

  async componentDidMount() {
    const carsResponse = await this.getData("/cars")
    const planesResponse = await this.getData("/planes")
    console.log("ServerData:", carsResponse)
    this.setState({ 
    cars: carsResponse.cars, 
    planes: planesResponse.planes 
    })
  }

  renderCars = (cars) => {
        const carElements =  cars
        .filter((car, index, array) => {
                return ("A" <= car.make.toUpperCase() && car.make.toUpperCase() <= "Z")
    })
    .map(this.renderCar)

    return carElements

  }

  renderPlane = (plane) => {
      return (
          <div>
              {
                plane.size === "100"
                ? <h1>{plane.name}</h1>
                :plane.size === "10"
                    ? <h2>{plane.name}</h2>
                    :plane.size === "1"
                        ? <h3>{plane.name}</h3>
                        : <div> ERROR </div>

              }
          </div>
      )
  }
  
  render() {
      return (
          <div>
              {this.state.planes.map(this.renderPlane)}
              {this.renderCars(this.state.cars)}
        </div>
      )
   }
}
