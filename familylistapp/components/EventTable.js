import React from 'react';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {AuthGetRequest, AuthPostRequest,AuthDeleteRequest} from '../utils/api';
import { getKey } from '../utils/session';
import EditableInput from './EditableInput'
import ResetPassword from './ResetPassword';
import CreateUserForm from './CreateUserForm';
import styles from '../styles/user.table.module.css'
import Router from 'next/router';
class EventTable extends React.Component{
    
    constructor(props){
        super(props);
        //{this.props.date.toDateString()}
        this.state = {events:[]}
        this.handleChangedName = this.handleChangedName.bind(this);
        this.handleUserUpdate = this.handleUserUpdate.bind(this);
        this.handleChangedEmail = this.handleChangedEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.sendReminder = this.sendReminder.bind(this);
    }
    findEventPosition(prop,searchVal){
        let e = this.state.events;
        for(let x=0; x<e.length; x++){
            if(e[x][prop] === searchVal){
                return x;
            }
        }
        return -1;
    }
    componentDidMount(){
        let url = "/api/event"
        AuthGetRequest(url,getKey()).then((data)=>{
            console.log(data);
            this.setState({events:data.data})
        })
    }
    handleUserUpdate(e,id){
       
        let userPos = this.findUserPosition("id",id);
        if(userPos <0 ){return;}
        let userObj = this.state.users[userPos];

        if("password" in userObj && userObj.password.length <=1){
            delete userObj["password"];
        }
        let url = "/api/user/"+id;
        AuthPostRequest(url,userObj,getKey()).then((data)=>{
            console.log(data);
            //this.setState({users:data});
        });
    }
    handleChangedName(event,id){
        let users = this.state.users;
        users.forEach((u)=>{
            if(u.id === id){
                
                u.username = event.target.value;
                return false;
            }
            return true;
        });
        
        this.setState({users:users});
    }
    handleChangedEmail(event,id){
        let users = this.state.users;
        users.every((u)=>{
            if(u.id === id){
                
                u.email = event.target.value;
                return false;
            }
            return true;
        });
        
        this.setState({users:users});
    }
    handleChangePassword(event, id){
        let users = this.state.users;
        users.every((u)=>{
            if(u.id === id){
                
                u.password = event.target.value;
                return false
            }
            return true;
        });
        this.setState({users:users});
    }
    deleteEvent(id){
        let url = "/api/event/"+id;
        AuthDeleteRequest(url,{},getKey()).then((data)=>{
            console.log(data);
            let pos = this.findEventPosition("id",id);
            if(pos <0){ return;}
            let e = this.state.events;
            e.splice(pos,1);
            this.setState({users:e});
        })
    }
    handleCreateUser(userData){
        let url = "/api/user"
        AuthPostRequest(url,userData,getKey()).then((data)=>{
            console.log(data);
            let userList = this.state.users;
            userList.push(data);
            this.setState({users:userList})
        })
       document.body.click();
    }
    handleAdminCheck(e,id){
        let users = this.state.users;
        users.every((u)=>{
            if(u.id === id){
                
                u.isAdmin = e.target.checked;
                return false;
            }
            return true;
        });
        
        this.setState({users:users});
        this.handleUserUpdate(null,id);


    }
    sendReminder(eventName,eventDate,eventID){
        console.log(eventID);
        //return;
        //if(this.state.emailSent){return;}
        let url = "/api/email";
        let sub = `${eventName} Reminder`
        let msg = `This is a reminder that the event: ${eventName} has been created for ${eventDate}. 
        Lists can be viewed: <a href="http://familylistapp.com/event/${eventID}">http://familylistapp.com/event/${eventID}</a>`;
        let data = {
            eventID:eventID,
            message:msg,
            subject:sub
        }
        AuthPostRequest(url,data,getKey());
        this.setState({emailSent:true})
    }
    render() {
        if(this.state.events.length<=0){return <></>;}
        let eventTable;
        if(this.state.events.length>0){
             eventTable= this.state.events.map((event)=>{
                //console.log(event);
                return <tr>
            
                <td>{event.eventName}</td>
                <td><Button onClick={(e)=>{
                    e.preventDefault();
                    let dateStr = event.eventDate.split("T");
                    
                    let date = new Date(dateStr[0]);
                    
                    this.sendReminder(event.eventName,date.toDateString(),event.id);
                }}>Send Reminder</Button></td>
                <td>{event.eventDate}</td>
                
                <td>
                    <Row>
                    <button className="btn btn-primary" onClick={()=>{let url = "/event/edit/"+event.id; Router.push(url);}}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>{this.deleteEvent(event.id);}}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                    </Row>
                </td>
                                    
            </tr>;
            })
        }
        const userPopover = (<Popover className={styles.userPopover} id="create-user-pop">
            
        <Popover.Content>
            <CreateUserForm submitCallback={this.handleCreateUser}/>
        </Popover.Content>
    </Popover>);
        return (

            <>
            <Row>
            <div className="">
                    <a href="/event/create" className="btn btn-primary addEventBtn">Add Event</a>
                </div>
            </Row>
            <Row>
                
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Event</th>
                    <th>Reminder</th>
                    <th>Date</th>
                    <th>Manage</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {eventTable}
                </tbody>
            </Table>
            </>
        );
    }
}
export default EventTable;