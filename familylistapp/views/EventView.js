
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
            host:this.props.host,
            emailSent:false
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
            let lists = data.data.lists;
            // console.log(getID());
            let endList = [];
            for(let x=0;x<lists.length; x++){
                console.log(lists[x]);
                if(lists[x].userId === getID()){
                    endList.unshift(lists[x]);
                }else{
                    endList.push(lists[x]);
                }
            }
            console.log(endList);
            let userID = getID();
            let rec = recievers.indexOf(userID) >= 0;
            let simpleDate = data.data.eventDate.split("Z");
            let date = new Date(simpleDate[0]);
            this.setState({
                name:data.data.eventName,
                date:date.toDateString(),
                 giving:givers,
                 recieving:recievers, 
                 isRecieving:rec,
                 lists: endList,//data.data[0].lists,
                currentListIDs:availableLists,
                   userID:getID()
                });
            
            
        })
    }
    sendReminder(){
        if(this.state.emailSent){return;}
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
        this.setState({emailSent:true})
    }
    render(){
        if(this.state.name.length <=0 || this.state.date.length <=0 ){return <></>;}
        let title = this.state.name;
        let date = this.state.date;
        let url = "/list/create/"+this.state.id;
        let btnText = 'Create Your List';
        let btnClasses = "header-btn btn btn-primary fullWidthBtn";
        if(this.state.currentListIDs.indexOf(this.state.userID)>=0){
            btnText = "Edit Your List"
            btnClasses = "header-btn btn btn-primary fullWidthBtn";
        }
        let subTitle =<a href={url} className={btnClasses}>{btnText}</a>;
        
    const lists = this.state.lists.map((list)=> {
        let claimURL = "/list/"+list.id; 
        let text = 'View List';

        let button = 'btn btn-primary fullWidthBtn';
       
        if(list.userId === this.state.userID){
            claimURL = url;
            text = 'Edit Your List';
            button = 'btn btn-outline-primary fullWidthBtn';
        } 
        return <Row className="listRow ">
            <Col sm="4" md="10" lg="10"><div className="userName">{list.user.username}</div></Col>
            <Col><a href={claimURL} className={button}>{text}</a></Col>

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
                <Col sm={8} className="headerCol text-center">
                <Link href="#" onClick={this.sendReminder}> Send an email reminder to all participants about this event.</Link>
                </Col>
                </Row>
            </div>
        
            
            
            {lists}
            </Container>
        )
    }
}
export default EventView;