import React, {Component} from 'react'
export default class extends Component {
    state = {
        make:"",
        model:"",
        year:0,
        mileage:0
    }
   
    onChangeHandler = (e) => {
        switch(e.target.id) {
            case "make":
                this.setState({make: e.target.value})
                break
            case"model":
                this.setState({model: e.target.value})
                break
            case"year":
                this.setState({year: Number(e.target.value)})
                break
            case"mileage":
                this.setState({mileage: Number(e.target.value)})
                break
            default:
            throw Error("Invalid Id")
        }
    }
    
    async postData(path,data) {
        const url = `http://localhost:3001${path}`
        const response = await fetch(url, {
            method: 'POST',
            mode: 'CORS',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        return response
    }

    clickHandler = async () => {
        await this.postData("/cars", this.state)
        }
    
    componentDidUpdate () {
       console.log(this.state)
     }
    
     render() {
        return (
        <div>
            <div>Make: <input id="make" type="text" onChange={this.onChangeHandler}/></div>
            <div>Model: <input id="model" type="text" onChange={this.onChangeHandler}/></div>
            <div>Year: <input id="year" type="text" onChange={this.onChangeHandler}/></div>
            <div>Mileage: <input id="mileage" type="text" onChange={this.onChangeHandler}/></div>
            <button onClick={this.clickHandler}>Create</button>
        </div>
       )
    }
}