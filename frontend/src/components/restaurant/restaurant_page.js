import React from 'react';

//api imports
import { getRestaurant } from '../../util/yelp_api'

//react components
import { Map, Marker } from 'google-maps-react';
import Loading from '../loading/spinner';


//css imports
import './restaurant.css';
import './bootstrap.css';

//carousel import
import Carousel from 'react-bootstrap/Carousel';

class RestaurantPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nextRestaurants: this.props.nextRestaurants,
            currRest: undefined,
        }
        this.addToVisited = this.addToVisited.bind(this)
        this.handlePickAnother = this.handlePickAnother.bind(this);
    }

    addToVisited() {
        const { id, name, image_url, location } = this.props.restaurant
        const visitedRestaurant = {
            restaurantId: id,
            name: name,
            imageUrl: image_url,
            userId: this.props.user.id,
            location: location.address1
        }
        this.props.addToVisited(visitedRestaurant)
            .then(() => this.props.history.push('/user'),
            () => this.props.history.push('/user'))
    }

    getRestaurant() {
        const restaurantId = this.props.match.params.id
        const restaurants = this.props.restaurants
        for (let i = 0; i < restaurants.length; i++) {
            const restaurant = restaurants[i]
            if (restaurant.id === restaurantId) {
                return restaurant
            }
        }
    }

    componentDidMount() {
        const id = {
            params: { 
                id: this.props.match.params.id
            }
        }
        getRestaurant(id).then(res => {
            this.props.receiveRestaurant(res.data);
            this.setState({currRest: Object.assign({}, res.data)});
        })  
    }

    handlePickAnother(){
        let nextRest = this.state.nextRestaurants.pop();
        if (nextRest){
            this.props.receiveRestaurant(nextRest);
            this.setState({currRest: nextRest});
        } else{
            alert('Out of restaurants with those specified preferences')
            if(process.env.NODE_ENV === 'production'){
                window.location.replace('https://watchuwant.herokuapp.com/#/preferences')
            } else {
                window.location.replace('http://localhost:3000/#/preferences')
            }
           
        }
    }
    
    render() {
        if (this.state.currRest === undefined) return <Loading />;
        let restaurant = this.state.currRest;
        if (restaurant.coordinates === undefined) return <Loading />;

        const {categories, rating, review_count, price, photos, hours, url} = restaurant;
        return (
            <div id='restaurant-show-page'>
                <img id="background-image"
                    alt='background'
                    src="https://images.unsplash.com/photo-1516749622035-ab9e45262e0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80">
                </img>
                <h1 id="name">{restaurant.name}</h1>
                
            </div>
        )
    }
}

export default RestaurantPage;



{/* <div id="restaurant-info-container" className="section-container">
    <div className="image-container">
        <img alt='restaurant' src={restaurant.image_url}></img>
    </div>
</div> */}

{/* <div id="map-container" className="section-container">
    <Map
        google={window.google}
        zoom={15}
        initialCenter={{ lat: restaurant.coordinates.latitude, lng: restaurant.coordinates.longitude}}
        center={{ lat: restaurant.coordinates.latitude, lng: restaurant.coordinates.longitude}}
        >
        <Marker position={{ lat: restaurant.coordinates.latitude, lng: restaurant.coordinates.longitude}} />
    </Map>
</div> */}

{/* <div className="restaurant-details">
    <p>{restaurant.location.address1}, {restaurant.location.city}, {restaurant.location.state} {restaurant.location.zip_code}</p>
    <p>{restaurant.display_phone}</p>
</div> */}

{/* <div className="choices">
    <p onClick={this.addToVisited}>EAT HERE</p>
    <p onClick={this.handlePickAnother}>NEXT RESTAURANT</p>
    <p onClick={() => this.props.history.push('/user')}>CHOOSE FROM VISITED</p>
    <p onClick={() => this.props.history.push('/preferences')}>CHANGE PREFERENCES</p>
</div> */}