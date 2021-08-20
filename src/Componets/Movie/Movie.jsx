import axios from 'axios';
import React, { Component } from 'react';
import { API_KEY, API_LINK, IMG_LINK } from '../../API/secrets';
import { Link } from 'react-router-dom';
import "./Movie.css";
class Movie extends Component {
    state = { 
        detailMovieObj:{}
     }

    async componentDidMount(){
        // https://api.themoviedb.org/3/movie/299534?api_key=bdd243ea847239dc0799805e63e189f0
        let response= await axios.get(`${API_LINK}/movie/${this.props.movie.id}?api_key=${API_KEY}`);
        // console.log(response);
        let detailMovie=response.data;
        
        let posterPath=IMG_LINK+detailMovie.poster_path;
        this.setState({
            detailMovieObj :{...detailMovie,poster_path:posterPath}
        }
        );

    }
    render() { 
        let {poster_path,title,vote_average}=this.props.movie;
        let poster_link=IMG_LINK+poster_path;
        return ( 
           <div className="movie-item">
               <div className="movie-poster">
                   <Link to={{pathname:"/moviepage", state:this.state.detailMovieObj}}>
                   <img src={poster_link} alt=""/>
                   </Link>
               </div>
               <div className="movie-info">
                   <div className="movie-title">{title}</div>
                   <div className="movie-rating">{vote_average} IMDB</div>
               </div>
           </div>
         );
    }
}
 
export default Movie;