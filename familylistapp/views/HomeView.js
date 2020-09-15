import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import EventCard from '../components/EventCard.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {GetRequest} from '../utils/api';
class HomeCard{
    constructor(id,date,title){
        this.id = id;
        this.date = date;
        this.title = title;
    }
}
class HomeView extends React.Component{
    constructor(props){
        super(props);
        this.state={events:[]};
    }
    componentDidMount(){
        console.log(process.env.URL);
        GetRequest("/api/event").then((data)=>{
            this.setState({events:data});
        });
    }

    render(){
        const cards = this.state.events.map((e)=> <EventCard date={new Date(e.eventDate)} title={e.eventName} id={e.id} image={e.image}/>);


        return(
            <Container className="innerContent">
            <div className="homeHeader">
                <div className="headerText">
                    <h2>Events</h2>
                </div>
                <div className="">
                    <a href="/event/create" className="btn btn-primary addEventBtn">Add Event</a>
                </div>
            </div>
            <Row>
                {cards}
            </Row>
            </Container>
        );
    }
}
export default HomeView;