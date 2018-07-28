import React, { Component } from 'react'
import './App.css'
import { withAuthenticator } from 'aws-amplify-react'
import { API, Analytics } from 'aws-amplify'

let apiName = 'PetAPI'
let path = '/pets'

class App extends Component {
  state = {
    pets: []
  }

  async componentDidMount () {
    const data = await API.get(apiName, path)
    console.log('data: ', data)
    this.setState({
      pets: data.data
    })
  }

  addToCart = () => {
    console.log('Simulating adding item to cart.')
    Analytics.record('Item added to cart!')
  }

  render () {
    return (
      <div className='App'>
        {this.state.pets.map((pet, index) => <h2 key={index}>{pet}</h2>)}
        <button onClick={this.addToCart}>Add To Cart</button>
      </div>
    )
  }
}

export default withAuthenticator(App)
