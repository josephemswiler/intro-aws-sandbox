import React, { Component } from 'react'
import './App.css'
import { withAuthenticator } from 'aws-amplify-react'
import { API, Analytics, graphqlOperation } from 'aws-amplify'

let apiName = 'PetAPI'
let path = '/pets'

const ListPets = `
  query {
    listPets {
      items {
        id
        name
      }
    }
  }
`

const CreatePet = `
  mutation($name: String!) {
    createPet(input: {
      name: $name
    }) {
      id
    }
  }
`

class App extends Component {
  state = {
    name: '',
    pets: []
  }

  async componentDidMount () {
    const pets = await API.graphql(graphqlOperation(ListPets))
    console.log('pets: ', pets) // optional, if you would like to view the shape of the data
    this.setState({ pets: pets.data.listPets.items })
  }

  addToCart = () => {
    console.log('Simulating adding item to cart.')
    Analytics.record('Item added to cart!')
  }

  onChange = e => {
    this.setState({ name: e.target.value })
  }

  createPet = () => {
    const pet = { name: this.state.name }
    API.graphql(graphqlOperation(CreatePet, pet))
    const pets = [...this.state.pets, pet]
    this.setState({ pets, name: '' })
  }

  render () {
    return (
      <div className='App'>
        {this.state.pets.map((pet, index) => <h2 key={index}>{pet.name}</h2>)}
        <input onChange={this.onChange} placeholder='Pet name' />
        <button onClick={this.createPet}>Create Pet</button>
        {/* <button onClick={this.addToCart}>Add To Cart</button> */}
      </div>
    )
  }
}

export default withAuthenticator(App)
