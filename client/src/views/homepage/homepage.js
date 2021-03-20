import React, { Component } from "react";
import SimpleStorageContract from "../../contracts/SimpleStorage.json"
import getWeb3 from "../../getWeb3";
import {
  Redirect
} from "react-router-dom";
import "./homepage.css";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { storageValue: 0, web3: null, accounts: null, contract: null, cardCreated:null, totalCards: null };
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeStrength = this.handleChangeStrength.bind(this);
    this.handleChangeDefence = this.handleChangeDefence.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.singleView = this.singleView.bind(this);

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

  singleView(cardId) {
    console.log(cardId)
  }

  callContract = async() => {
    this.setState({
      formSubmission: false
    })
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.

    await contract.methods.createCard(
      this.state.id,
      this.state.strength,
      this.state.defence
    ).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.cards(this.state.id).call();
    const cardsArray = await contract.methods.getCards().call();
    if (response && cardsArray) {
      this.setState({
        cardCreated: response,
        totalCards: cardsArray,
        formSubmission: true
      })
    }
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

    if (this.state.formSubmission) {
      console.log(this.state.totalCards)
      return <Redirect
      to={{
        pathname: "/cards",
        state: { cardCreated: this.state.cardCreated, totalCards: this.state.totalCards }
      }}
    />
    }
    return (
      
      <div class="main">
        <div>
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
        </div>


        <main class="container">
          <div class="py-5 px-3 form-container">
            <form onSubmit={this.handleSubmit}>
              <div class="mb-3">
                <label class="form-label">id</label>
                <input type="id" class="form-control" id="cardId" onChange={this.handleChangeId}/>
              </div>
              <div class="mb-3">
                <label class="form-label">strength</label>
                <input type="strength" class="form-control" onChange={this.handleChangeStrength}/>
              </div>
              <div class="mb-3">
                <label class="form-label">defence</label>
                <input type="defence" class="form-control" required onChange={this.handleChangeDefence}/>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </main>
      <div>The stored value is: {this.state.storageValue}</div>
    </div>
    );
    
  }
}

export default Homepage;
