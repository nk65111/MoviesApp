import axios from 'axios';
import React, { Component } from 'react';
import Youtube from "react-youtube";
import "./MoviePage.css"
import { API_KEY, API_LINK } from '../../API/secrets';
class MoviePage extends Component {
    state = { 
        videoObject:{},
     }
     async componentDidMount(){
        let response=await axios.get( `${API_LINK}/movie/${this.props.location.state.id}/videos?api_key=${API_KEY}&language=en-US`);
        console.log(response);
        // let videoObject=response.data.results.filter((videoObj)=>{
        //   if(videoObj.type=="Trailer"&&videoObj.site=="YouTube"){
        //       return true;
        //   }
        //   else if(videoObj.type=="Teaser"){
        //       return true
        //   }
        //   return false;
        // });
        
        this.setState({
            videoObject:response.data.results[0],
        });
     }
  
    render() {
        const opts = {
            height:"100%",
            width: "100%",
            playerVars: {
              autoplay: 1,
            },
          };
        let {poster_path,title,overview,tagline,vote_average}=this.props.location.state; 
        return ( 
            <div className="movie-page">
                <div className="movie-page-poster">
                    <img src={poster_path} alt="" />
                </div>
                <div className="movie-page-details">
                    <div className="movie-title-info">
                        <h1>
                            {title}<br></br>{vote_average} IMDB
                        </h1>
                        <span>{tagline}</span>
                        <p>{overview}</p>
                    </div>
                    {this.state.videoObject.key?(<div className="movie-trailer">
                       <Youtube videoId={this.state.videoObject.key} opts={opts}></Youtube>
                    </div>):
                    (
                        <Youtube  opts={opts}></Youtube>
                    )
                    
                    } 
                </div>
                
            </div>
         );
    }
}
 
export default MoviePage;