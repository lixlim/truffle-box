import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { storageValue: 0, web3: null, accounts: null, contract: null, cardCreated:null, totalCards: null};
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeStrength = this.handleChangeStrength.bind(this);
    this.handleChangeDefence = this.handleChangeDefence.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeId(event) {
    this.setState({id: event.target.value});
  }

  handleChangeStrength(event) {
    this.setState({strength: event.target.value});
  }

  handleChangeDefence(event) {
    this.setState({defence: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.value);
    event.preventDefault();
    this.callContract();

  }

  callContract = async() => {
    const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    await contract.methods.createCard(
      this.state.id,
      this.state.strength,
      this.state.defence
    ).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.cards(this.state.id).call();
    this.setState({
      cardCreated: response
    })
    const cardsArray = await contract.methods.getCards().call();
    this.setState({
      totalCards: cardsArray
    })
    console.log(cardsArray)
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      
      <div className="App">

        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                <ul class="dropdown-menu" aria-labelledby="dropdown01">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
        {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            id
            <input type="text" name="name"  onChange={this.handleChangeId} />
          </label><br></br>
          <label>
            strength
            <input type="text" name="name"  onChange={this.handleChangeStrength} />
          </label><br></br>
          <label>
            defence
            <input type="text" name="name"  onChange={this.handleChangeDefence} />
          </label><br></br>
        { this.state.cardCreated  &&
        <label>
            card created
             <div> id: { this.state.cardCreated.id } </div>
             <div> strength: { this.state.cardCreated.strength } </div>
             <div> defence: { this.state.cardCreated.defence } </div>
        </label>
        }
        {this.state.totalCards &&
            <table>
            <tr>
              <th>id</th>
              <th>strength</th>
              <th>defence</th>
            </tr>
            {this.state.totalCards && this.state.totalCards.map(card => {
            return  (
              <tr>
                <td>{card.id}</td>
                <td>{card.strength}</td>
                <td>{card.defence}</td>
              </tr>
            )})}
          </table>
        }
  
          <input type="submit" value="Submit" />
        </form> */}


        
      </div>

      
    );
    
  }
}

export default App;
