
import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { GetRequest } from '../utils/api';
//import {getEvent,getEventLists} from './API.js';
//import { getID } from './Session.js';
class EventView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id:this.props.id,
            name:'',
            date:'',
            giving:[],
            recieving:[], 
            isRecieving:true,
            lists:[],
            currentListIDs:[],
            userID:-1
        };
    }
    componentDidMount(){
        let url = "/api/event/"+this.props.id;
        GetRequest(url).then(data=>{
            console.log(data);
            //let givers = data.event.Givers.map((obj)=>obj.id);
            
            //let recievers = data.event.Receivers.map((obj)=>obj.id);
            //let availableLists = data.event.lists.map((obj)=>obj.userId);
            //let userID = getID();
            //let rec = recievers.indexOf(userID) >= 0;
            let date = new Date(data.eventDate);
            this.setState({
                name:data.eventName,
                date:date.toDateString(),
                // giving:givers,
                // recieving:recievers, 
                // isRecieving:rec,
                //  lists:data.event.lists,
                // currentListIDs:availableLists,
                //userID:getID()
                });
            
            
        })
    }
    render(){
        let title = this.state.name;
        let date = this.state.date;
        let url = "/list/create/"+this.state.id;
        let btnText = 'Create Your List';
        if(this.state.currentListIDs.indexOf(this.state.userID)>=0){
            btnText = "Edit Your List"
        }
        let subTitle = <Row><Col><a href={url} className="btn btn-primary">{btnText}</a></Col></Row>;
        
    const lists = this.state.lists.map((list)=> {
        let claimURL = "/viewList/"+list.id; 
        let text = 'View List';
        console.log(list);
        if(list.userId === this.state.userID){
            claimURL = url;
            text = 'Edit List';
        }
        return <Row xs={3} md={3} lg={3} className="listRow  justify-content-md-center"><Col>{list.user.username}</Col><Col>{list.list_items.length} Items</Col>
        <Col><a href={claimURL} className="btn btn-primary">{text}</a></Col></Row>
        
    });
        return(
            <Container className="innerContent">
            <div className="header-column">
                <div className="headerText">
                    <h2>{title}</h2>
                </div>
                <div className="header-date">{date}</div>
                <div className="header-btn">{this.state.isRecieving &&
                subTitle
            }</div>
            </div>
        
            
            <Row className="table-header justify-content-md-center"><Col>Name</Col><Col>Amount</Col><Col></Col></Row>
            {lists}
            </Container>
        )
    }
}
export default EventView;