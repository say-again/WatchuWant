import React from 'react';
// import './preferences.css';
import { search } from '../../util/yelp_api';
import { Redirect } from 'react-router-dom';

class PreferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: "distance",
            distance: "",
            price: "",
            cuisine: ""
        };

        this.updateDistance = this.updateDistance.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.commenceSearch = this.commenceSearch.bind(this)
        this.updateCuisine = this.updateCuisine.bind(this)
    }

    updateCuisine(e) {
        this.setState({
            cuisine: e.target.value
        })
    }

    updateDistance(e) {
        if(e.target.value === '') {
            this.setState({
                distance: ''
            })
        } else {
            const checkNum = Number(e.target.value);
            if(!isNaN(checkNum)) {
                this.setState({
                    distance: checkNum
                })
            }
        }
    }

    updatePrice(e) {
        this.setState({
            price: e.target.innerHTML
        })
    }

    commenceSearch(e) {
        e.preventDefault();
        const preferences = {
            //keys names can't be changed. Yelp api looks specifically for them
            params: {
                location: 'san francisco', //location or coordinates
                categories: [], //array of string, yelp has list of supported categories
                limit: 10, // limits search, max 50
                price: String(this.state.price.length), //string "1", "2", "3", or "4"
                term: this.state.cuisine,  //specific search term
                radius: (Number(this.state.distance) * 1609), //radius in meters, max is 40_000meters approx 25miles
                rating: 4.5, //decminal 1 through 5
            }
        }
        
        search(preferences)
            .then(res => { 
                this.props.receiveRestaurants(res.data);
                const rests = res.data.businesses;
                if (rests.length !== 0) {
                    let idx = Math.floor(Math.random() * rests.length);
                    this.props.history.push(`/restaurants/${rests[idx].id}`);
                }
             })
            .catch(errors => console.log(errors));
        
        //TODO:
        //redirect to results page

        // <Redirect to={`/results`}/>
    }


    render() {
        return (
            <section  id="preference-form">
                <div className="question">
                    <label>How far would you like to travel?</label>
                    <div id="distance-input-container">
                        <input value={this.state.distance} onChange={this.updateDistance}/> mile(s)
                    </div>
                </div>
                <div className="question">
                    <label>What's your price range?</label>
                    <div id="price-container">
                        <button onClick={this.updatePrice} className={this.state.price === "$" ? "selected" : ""}>$</button>
                        <button onClick={this.updatePrice} className={this.state.price === "$$" ? "selected" : ""}>$$</button>
                        <button onClick={this.updatePrice} className={this.state.price === "$$$" ? "selected" : ""}>$$$</button>
                        <button onClick={this.updatePrice} className={this.state.price === "$$$$" ? "selected" : ""}>$$$$</button>
                    </div>
                </div>
                <div className="question">
                    <label>What type of food are you craving?</label>
                    <select defaultValue={'default'} onChange={this.updateCuisine}>
                        <option disabled value='default'>Select a food category</option>
                        <option value="asian">Asian</option>
                        <option value="mexican">Mexican</option>
                        <option value="american">American</option>
                        <option value="indian">Indian</option>
                        <option value="italian">Italian</option>
                        <option value="mediterranean">Mediterranean</option>
                    </select>
                </div>
                <div id="find-restaurant">
                    <button id="find-button" onClick={this.commenceSearch}>Let's find a place!</button>
                </div>
            </section>
        )
    }
}

export default PreferenceForm