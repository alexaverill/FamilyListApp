import React from 'react';
import ListItem from './ListItem.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { GetRequest, AuthPostRequest } from '../utils/api.js';
//import {createEvent, getUsers} from './API.js';
import styles from '../styles/create.event.module.css'
import { getKey } from '../utils/session.js';
import Router from 'next/router';
class CreateEvent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {name:'',
                    date:new Date(),
                    comments:'',
                    users:[{id:1,username:"test"},{id:2,username:"lol"}],
                    giving:[],
                    recieving:[],
                    givingStatus:[],
                    recievingStatus:[]
                };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGiving = this.handleGiving.bind(this);
        this.handleRecieving = this.handleRecieving.bind(this);
        this.checkAllGiving = this.checkAllGiving.bind(this);
        this.checkAllRecieving = this.checkAllRecieving.bind(this);
    }
    handleNameChange(event){
        const _name = event.target.value;
        this.setState({name:_name});
    }
    handleDateChange(event){
        console.log(event.target.value);
        this.setState({date:event.target.value});
    }
    async handleSubmit(event){
        //console.log("Submitted");
        //console.log(event);
        event.preventDefault();
        let url = "/api/event";
        let data = {
            name:this.state.name,
            date:this.state.date,
            comments:this.state.comments,
            giving:this.state.giving,
            recieving:this.state.recieving
        }
        AuthPostRequest(url,data,getKey()).then(data=>{
            if(data.status === false){return;}
            console.log(data);
            let id = data.data.id;
            let url = "/event/"+id;
            Router.push(url);
        });
        // createEvent(this.state.name,this.state.date,this.state.comments,this.state.giving,this.state.recieving).then(data=>{
        //     if(data.status ==="true"){
        //         let url = "/events/"+data.id;
        //         this.props.history.push(url);
        //     }
        //     console.log(data);
        // });

    }
    handleGiving(event,pos){
        console.log("Giving Changed "+pos);
        let giveArr = this.state.givingStatus;
        giveArr[pos] = !giveArr[pos];
        let value = event.target.name;
        let givingArr = this.state.giving;
        if(event.target.checked){
            if(givingArr.indexOf(value)<0){
                givingArr.push(value);
                this.setState({giving:givingArr,givingStatus:giveArr});
            }
        }else{
        
            let pos = givingArr.indexOf(value);
            givingArr.splice(pos,1);
            this.setState({giving:givingArr,givingStatus:giveArr});
        }
    }
    handleRecieving(event,pos){
        let value = event.target.name;
        let recieveArr = this.state.recievingStatus;
        recieveArr[pos] = !giveArr[pos];
        let recievingArr = this.state.recieving;
        if(event.target.checked){
            if(recievingArr.indexOf(value)<0){
                recievingArr.push(value);
                this.setState({recieving:recievingArr,recievingStatus:recieveArr});
            }
        }else{
        
            let pos = recievingArr.indexOf(value);
            recievingArr.splice(pos,1);
            this.setState({recieving:recievingArr,recievingStatus:recieveArr});
        }
    }
    async queryUsers(){
        let users = await getUsers();
        
        return users;
    }
    componentDidMount(){
        let url = "/api/user";
     GetRequest(url).then((user)=>{
         console.log(user);
         if(user.status === false) {return;}
          this.setState({users:user});
          this.state.users.map((u)=> {
            this.setState((state, props) => ({
                    givingStatus:  [...state.givingStatus,false],
                    recievingStatus: [...state.givingStatus,false]
                  }));
            
        });
        
        //this.setState({users:userList});
    });
    }
    checkAllGiving(e){
        // let allGiving = this.state.AllGivingChecked;
        e.preventDefault()
        this.setState((state, props) => ({
            givingStatus: state.givingStatus.map((val)=>{
                return !val;
            }),
            giving:state.users.map((usr)=>{
                return usr.id;
            })
          }));

    }
    checkAllRecieving(e){
        e.preventDefault();
        this.setState((state, props) => ({
            recievingStatus: state.recievingStatus.map((val)=>{
                return !val;
            }),
            recieving:state.users.map((usr)=>{
                return usr.id;
            })
          }));
    }
    render() {
       
        const items = this.state.users.map((u,index)=> {
            
        let result = <Form.Group controlId="formBasicCheckbox" className={styles.userRow} as={Row}>  
                            <Col>{u.username}</Col>
                            <Col><Form.Check inline type="checkbox" name={u.id} onChange={(evt) => this.handleGiving(evt,index)} label="" checked={this.state.givingStatus[index] || false}/></Col>
                            <Col><Form.Check inline type="checkbox" name={u.id} onChange={(evt) => this.handleRecieving(evt,index)} label="" checked={this.state.recievingStatus[index] || false}/></Col>
                    </Form.Group>;
        
        return result;
     });
        return (
            <Container className="innerContent">
                <h2>Create New Event</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="eventTitle" as={Row}>
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="5">
                        <Form.Control type="text" name="name"  maxLength="100" onChange={this.handleNameChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="eventDate" as={Row}>
                        <Form.Label column sm="2">Date:</Form.Label>
                        <Col sm="4" md="4">
                        <Form.Control name="date" type="date" onChange={this.handleDateChange} />
                        </Col>
                    </Form.Group>
                    <Row className={styles.titleRow}><Col sm="4">Name</Col>
                    <Col className={styles.titleCol}> <button  className="btn btn-outline-secondary" onClick={this.checkAllGiving}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
</svg>
                        </button><div className={styles.checkTitle}>Giving Gifts </div></Col>
                    <Col className={styles.titleCol}> <button className="btn btn-outline-secondary" onClick={this.checkAllRecieving}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
</svg>
                        </button> <div className={styles.checkTitle}>Recieving Gifts</div></Col>
                    </Row>
                    {items}
                    <Button variant="primary" type="submit">
                        Create Event
                    </Button>
                </Form>
            </Container>
        );
    }
}
export default CreateEvent

