import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import PokemonIndexList from './components/PokemonListIndex';
import PokemonModal from './components/PokemonModal';



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      pokemon: [],
      activePage: 0,
      limit: 50,
      offset: 0,
      totalPages:0,
      count:0,
      loaded: false,
      show:false
    };
    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  loadPokemon(url) {
    fetch(url)
      .then(response => {
        return response.json();
      }).then(json => {
        let pages = Math.round(json.count / this.state.limit);
        this.setState({
          pokemon: json.results,
          totalPages:pages,
          count: json.count,
          loaded:true
        })
        console.log(this.state)
      }).catch(err => {
        console.log(err);
      })
  }
  componentWillMount() {
    this.loadPokemon(`${this.props.baseUrl}/pokemon/`);
  }

  handleLimitChange(evt){
    console.log(evt.target.innerHTML)
    this.setState({
      limit: +evt.target.innerHTML || this.state.count
    }, () =>{
      // this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=0`);
    })
  }

  handlePaginationSelect(selectedPage) {
      let offset = this.state.limit * selectedPage;
      this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${offset}`);
      this.setState({
        activePage: selectedPage
      })
  }

  openModal() {
    this.setState({
      show:true
    })
  }

  closeModal() {
   this.setState({
     show:false
   })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {this.state.loaded ? null: "Loading..."}
        <PokemonModal
        showModal={this.state.show}
        openModal={this.openModal}
        closeModal={this.closeModal}
       />

        <PokemonIndexList
          listOfPokemon={this.state.pokemon}
          display={this.state.loaded}
          options={[10,50,100,200]}
          selectedValue={this.state.limit}
          allValue={this.state.count}
          onOptionSelected={this.handleLimitChange}
          istOfPokemon={this.state.pokemon}
          bsSize="small"
          items={this.state.totalPages}
          activePage={this.state.activePage}
          onSelect={this.handlePaginationSelect}
          totalPages={this.state.totalPages}
        />


      </div>
    );
  }
}

export default App;
