import React, { Component } from 'react';
import Movie from '../Movie/Movie';
import "./Movies.css";
class Movies extends Component {
    state = {  }
    render() { 
        console.log(this.props.movies);

        return ( 
            <div className="Movies">
                {   
                    this.props.movies.map((movieObject)=>{
                       return <Movie key={movieObject.id} movie={movieObject}>{movieObject.poster_path}</Movie>;
                    })
                }
            </div>
         );
    }
}
 
export default Movies;