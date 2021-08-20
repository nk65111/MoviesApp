import React, { Component } from 'react';
import Header from './Componets/Header/Header';
import Movies from './Componets/Movies/Movies';
import Pagination from './Componets/Pagination/Pagination';
import Favourites from './Componets/Favourites/Favourites';
import MoviePage from './Componets/MoviePage/MoviePage';
import axios from "axios";
import { API_KEY, API_LINK } from './API/secrets';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  state = {
    movieData: [],
    currentMovie: "Avenger",
    pages: [],
    currentPage: 1
  }


  async componentDidMount() {

    let data = await axios.get(`${API_LINK}/search/movie`, { params: { api_key: API_KEY, page: 1, query: this.state.currentMovie } })
    console.log(data)
    let movieData = data.data.results;
    let totalPage = data.data.total_pages;
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    this.setState({
      movieData: movieData,
      pages: pages
    });

  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(`${API_LINK}/search/movie`, { params: { api_key: API_KEY, page: 1, query: newMovieName } });
    let movieData = data.data.results;
    let totalPage = data.data.total_pages;
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    this.setState({
      movieData: movieData,
      currentMovie: newMovieName,
      pages: pages
    });

  }

  nextPage = async () => {
    let data = await axios.get(`${API_LINK}/search/movie`, {
      params: {
        api_key: API_KEY,
        page: this.state.currentPage + 1,
        query: this.state.currentMovie
      }
    });
    let movieData = data.data.results;
    this.setState({
      movieData: movieData,
      currentPage: this.state.currentPage + 1
    })
  }
  perviousPage = async () => {
    let data = await axios.get(`${API_LINK}/search/movie`, {
      params: {
        api_key: API_KEY,
        page: this.state.currentPage - 1,
        query: this.state.currentMovie
      }
    });
    let movieData = data.data.results;
    this.setState({
      movieData: movieData,
      currentPage: this.state.currentPage - 1
    });
  }

  setPage = async (pageNo) => {
    let data = await axios.get(`${API_LINK}/search/movie`, {
      params: {
        api_key: API_KEY,
        page: pageNo,
        query: this.state.currentMovie
      }
    });
    let movieData = data.data.results;
    this.setState({
      movieData: movieData,
      currentPage: pageNo
    });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header setMovies={this.setMovies}></Header>
          <Switch>
            <Route path="/" exact>
              {this.state.movieData.length ?
                (<React.Fragment>
                  <Movies movies={this.state.movieData}></Movies>
                  <Pagination pages={this.state.pages} currPage={this.state.currentPage} nextPage={this.nextPage}
                    perviousPage={this.perviousPage} setPage={this.setPage}></Pagination>
                </React.Fragment>
                ) : (
                  <h1>OOps No vide Found</h1>
                )
              }
            </Route>
            <Route path="/fav" exact>
              <Favourites></Favourites>
            </Route>

            <Route path="/moviepage" exact component={MoviePage}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;