import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import EventCard from '../components/EventCard.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {AuthGetRequest} from '../utils/api';
import {getKey} from '../utils/session';
import Router from 'next/router';
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
        AuthGetRequest("/api/event",getKey()).then((data)=>{
            console.log(data);
            if(!data.authorized){
                Router.push('/login');
                return;
            }
            this.setState({events:data.data});
        });
    }

    render(){
        const cards = this.state.events.map((e)=> {
            let simpleDate = e.eventDate.split("Z");
        return <EventCard date={new Date(simpleDate[0])} title={e.eventName} id={e.id} image={e.image}/>
        });


        return(
            <Container className="innerContent">
            <div className="homeHeader">
                <div className="headerText">
                    <h2>Events</h2>
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