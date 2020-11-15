
import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AuthGetRequest, AuthPostRequest } from '../utils/api';
//import {getEvent,getEventLists} from './API.js';
import { getID, getKey } from '../utils/session';
import Router from 'next/router';
import Link from 'next/link';
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
            userID:-1,
            host:this.props.host
        };
        
        this.sendReminder = this.sendReminder.bind(this);
    }
    componentDidMount(){
        let url = "/api/event/"+this.props.id;
        AuthGetRequest(url,getKey()).then(data=>{
            console.log(data);
            if(!data.authorized){
                Router.push("/login");
            }
            let givers = data.data.Givers.map((obj)=>obj.id);
            
            let recievers = data.data.Recievers.map((obj)=>obj.id);
            let availableLists = data.data.lists.map((obj)=>obj.userId);
            let userID = getID();
            let rec = recievers.indexOf(userID) >= 0;
            let date = new Date(data.data.eventDate);
            this.setState({
                name:data.data.eventName,
                date:date.toDateString(),
                 giving:givers,
                 recieving:recievers, 
                 isRecieving:rec,
                 lists: data.data.lists,//data.data[0].lists,
                currentListIDs:availableLists,
                   userID:getID()
                });
            
            
        })
    }
    sendReminder(){
        console.log("HOST: "+this.state.host);
        let url = "/api/email";
        let sub = `${this.state.name} Reminder`
        let msg = `This is a reminder that the event: ${this.state.name} has been created for ${this.state.date}. 
        Lists can be viewed: <a href="http://familylistapp.com/event/${this.state.id}">http://familylistapp.com/event/${this.state.id}</a>`;
        let data = {
            eventID:this.state.id,
            message:msg,
            subject:sub
        }
        AuthPostRequest(url,data,getKey());
    }
    render(){
        let title = this.state.name;
        let date = this.state.date;
        let url = "/list/create/"+this.state.id;
        let btnText = 'Create Your List';
        if(this.state.currentListIDs.indexOf(this.state.userID)>=0){
            btnText = "Edit Your List"
        }
        let subTitle =<a href={url} className="header-btn btn btn-primary fullWidthBtn">{btnText}</a>;
        
    const lists = this.state.lists.map((list)=> {
        let claimURL = "/list/"+list.id; 
        let text = 'View List';
        console.log(list);
        if(list.userId === this.state.userID){
            claimURL = url;
            text = 'Edit List';
        }
        return <Row className="listRow ">
            <Col sm="4" md="10" lg="10"><div className="userName">{list.user.username}</div></Col>
            <Col><a href={claimURL} className="btn btn-primary fullWidthBtn">{text}</a></Col>
        </Row>
        
    });
        return(
            <Container className="innerContent">
                <Row> <Link href="/">
                <a className="backlink"> &lsaquo;&lsaquo; Return to All Events</a></Link> </Row> 
            <div className="header-column">
                <div className="headerText">
                    <h2>{title}</h2>
                </div>
                <div className="header-date">{date}</div>
                <Row className="headerRow">
                    <Col sm={8} className="headerCol">
                    {this.state.isRecieving && subTitle}
                </Col>
                <Col sm={8} className="headerCol">
                <Button onClick={this.sendReminder} className="btn btn-secondary header-btn fullWidthBtn"> Send Reminder</Button>
                </Col>
                </Row>
            </div>
        
            
            
            {lists}
            </Container>
        )
    }
}
export default EventView;