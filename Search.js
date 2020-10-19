import React from 'react';
import axios from 'axios';
import App from './App.js';
//import "./Home.css";
//import "./Search.css";

class Search extends React.Component {
    state = { 
        isLoading: true,
        places: [],
        value: ""
    };
    
    getSearchPlace = async () => { 
        const ID_KEY = 'mNumRUe1GKLyZrADyJem';
        const SECRET_KEY = 'hCy80Z_aMM';
        const search = this.state.value;
        try { if (search === "") { 
                this.setState({places: [], isLoading: false}) 
            } else {
                const {data: {
                    items
                }} = await axios.get('https://openapi.naver.com/v1/search/local.json',{ 
                    params:{ 
                        query: search, 
                        display: 20 
                    },
                    headers: {
                        'X-Naver-Client-Id': ID_KEY,
                        'X-Naver-Client-Secret': SECRET_KEY 
                    } 
                }); 
                
                this.setState({places: items, isLoading: false}); 
            } 
        } catch (error) {
            console.log(error); 
        } 
    }; 
    
    componentDidMount() { 
        this.getSearchPlace(); 
    };
        
    handleChange = (e) => {
        this.setState({value: e.target.value});
    }; 
    
    handleSubmit = (e) => { 
        e.preventDefault(); 
        this.getSearchPlace(); 
    }; 
    
    render() {
        const {places, isLoading} = this.state;
         
        return (<section className="container"> 
        {
         isLoading 
         ? (<div className="loader">
            <span className="loader__text">Loading..</span> 
            </div>) 
            : (<form onSubmit={this.handleSubmit}> 
            <div><div className="input_div">
                <h1>Search</h1>
                <input className="input_search" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Searching..."/> 
                </div> 
                <div className="places"> {
                    places.map(place => ( <App key={place.link} id={place.link} category={place.category} title={place.title} address={place.address} roadAddress={place.roadAddress} mapx={place.mapx} mapy={place.mapy} />)) 
                }</div> 
                </div> 
                </form>) 
        } 
        </section>); 
    } 
} 
            
export default Search;
