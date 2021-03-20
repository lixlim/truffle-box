import React, { Component } from "react";
import "./table.css";



class Table extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = props.location.state ? { totalCards: props.location.state.totalCards, cardCreated:props.location.state.cardCreated }:
    { totalCards: null, cardCreated: null};
    this.singleView = this.singleView.bind(this);
  }


  singleView(cardId) {
    console.log(cardId)
  }

  render() {
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
        { this.state.cardCreated  &&
        <label>
            card created
             <div> id: { this.state.cardCreated.id } </div>
             <div> strength: { this.state.cardCreated.strength } </div>
             <div> defence: { this.state.cardCreated.defence } </div>
        </label>
        }
        {this.state.totalCards &&
            <table class="table">
              <thead class="table-dark">
                <tr>
                  <th>id</th>
                  <th>strength</th>
                  <th>defence</th>
                  <th>action</th>
                </tr>
              </thead>
            {this.state.totalCards && this.state.totalCards.map(card => {
            return  (
              <tr>
                <td>{card.id}</td>
                <td>{card.strength}</td>
                <td>{card.defence}</td>           
                <td>          
                  <button onClick={() => this.singleView(card.id)} class="btn btn-primary">view more</button>
                </td>
              </tr>
            )})}
          </table>
        }
      </div>
      
    );
    
  }
}

export default Table;
