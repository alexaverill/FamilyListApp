import React from 'react';
import ListItem from './ListItem.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AuthGetRequest, AuthPostRequest } from '../utils/api.js';
//import {createEvent, getUsers} from './API.js';
import styles from '../styles/create.event.module.css'
import { getKey } from '../utils/session.js';
import Router from 'next/router';
import Link from 'next/link'
class CreateEvent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
                    id:-1,
                    name:'',
                    date:new Date(),
                    comments:'',
                    users:[{id:1,username:"test"},{id:2,username:"lol"}],
                    giving:[],
                    receiving:[],
                    givingStatus:[],
                    receivingStatus:[],
                    givingError:false,
                    receivingError:false,
                    validated:false
                };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGiving = this.handleGiving.bind(this);
        this.handleReceiving = this.handleReceiving.bind(this);
        this.checkAllGiving = this.checkAllGiving.bind(this);
        this.checkAllReceiving = this.checkAllReceiving.bind(this);
    }
    handleNameChange(event){
        const _name = event.target.value;
        this.setState({name:_name});
    }
    handleDateChange(event){
        console.log(event.target.value);
        
        this.setState({date:event.target.value});
    }
    validateForm(event){
        let valid = true;

        //giving/receiving checkboxes have at least one checked
        if(this.state.giving.length < 1){
            this.setState({givingError:true});
            valid=false;
        } else{
            this.setState({givingError:false});
        }
        if(this.state.receiving.length < 1){
            this.setState({receivingError:true});
            valid=false;
        } else{
            this.setState({receivingError:false});
        }

        //everything else
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({validated:true});
            valid=false;
        }
        
        return valid;
    }
    async handleSubmit(event){
        event.preventDefault();
        if(this.validateForm(event)){
            
            let url = "/api/event";
            let data = {
                id:this.state.id,
                name:this.state.name,
                date:this.state.date,
                comments:this.state.comments,
                giving:this.state.giving,
                receiving:this.state.receiving
            }
            AuthPostRequest(url,data,getKey()).then(data=>{
                //if(!data.authorized){Router.push('/login'); return;}
                console.log(data);
                let id = data.data[0].id;
                let url = "/event/edit/"+id;
                Router.push(url);
            });
        }

    }
    handleGiving(event,pos){
        
        let giveArr = this.state.givingStatus;
        giveArr[pos] = !giveArr[pos];
        let value = parseInt(event.target.name,10);
        let givingArr = this.state.giving;
        if(event.target.checked){
            
                let pos = givingArr.indexOf(value);
                if(pos > -1){
                givingArr.splice(pos,1);
                }
                givingArr.push(value);
                this.setState({giving:givingArr,givingStatus:giveArr});
            
        }else{
        
            let pos = givingArr.indexOf(value);
            givingArr.splice(pos,1);
            this.setState({giving:givingArr,givingStatus:giveArr});
        }
    }
    handleReceiving(event,pos){
        let value = parseInt(event.target.name,10);
        let recieveArr = this.state.receivingStatus;
        recieveArr[pos] = !recieveArr[pos];
        let receivingArr = this.state.receiving;
        if(event.target.checked){
            
                let pos = receivingArr.indexOf(value);
                if(pos > -1){
                    receivingArr.splice(pos,1);
                }
                console.log(value);
                receivingArr.push(value);
                this.setState({receiving:receivingArr,receivingStatus:recieveArr});
            
        }else{
        
            let pos = receivingArr.indexOf(value);
            receivingArr.splice(pos,1);
            this.setState({receiving:receivingArr,receivingStatus:recieveArr});
        }
    }
    async queryUsers(){
        let users = await getUsers();
        
        return users;
    }
    componentDidMount(){
        let eventURL = "/api/event/"+this.props.id;
        let url = "/api/user";
        AuthGetRequest(eventURL,getKey()).then(eventData=>{
            console.log(eventData);
            if(!eventData.authorized){Router.push("/login");}
            let dateStr = eventData.data.eventDate.split("T")[0];
            let givers = eventData.data.Givers.map(u=> u.id);
            let recievers = eventData.data.Recievers.map(u=>u.id);
            this.setState({
                id:eventData.data.id,
                name:eventData.data.eventName,
                date: dateStr,
                giving:givers,
                receiving:recievers
            })
            return {givers:eventData.data.Givers,recievers:eventData.data.Recievers};
        }).then((givingData)=>{
                AuthGetRequest(url,getKey()).then((data)=>{
                let currentGivers = givingData.givers;
                let currentRecievers = givingData.recievers;
                let user = data.users;
                if(!data.authorized){Router.push("/login");}
                this.setState({users:user});
                this.state.users.map((u)=> {
                    let giverCheckedState = this.idInUserArr(currentGivers,u.id);
                    let recieverCheckedState = this.idInUserArr(currentRecievers,u.id);
                    this.setState((state, props) => ({
                            givingStatus:  [...state.givingStatus,giverCheckedState],
                            receivingStatus: [...state.givingStatus,recieverCheckedState]
                        }));
                    
                });
                
                //this.setState({users:userList});
            })
    });
    
    }
    idInUserArr(userArr, id){
        for(let x =0; x<userArr.length; x++){
            if(userArr[x].id === id){
                return true;
            }
        }
        return false;
        
    }
    checkAllGiving(e){
        
        let currentState = e.target.checked;
        if(currentState){
            this.setState((state, props) => ({
                givingStatus: state.givingStatus.map((val)=>{
                    return currentState;
                }),
                giving:state.users.map((usr)=>{
                    
                        return usr.id;
                    
                })
            }));
        }else{
            this.setState((state, props) => ({
                givingStatus: state.givingStatus.map((val)=>{
                    return currentState;
                }),
                giving:[]
            }));
        }
        
    }
    checkAllReceiving(e){

          let currentState = e.target.checked;
          if(currentState){
              this.setState((state, props) => ({
                receivingStatus: state.givingStatus.map((val)=>{
                      return currentState;
                  }),
                  receiving:state.users.map((usr)=>{
                      
                          return usr.id;
                      
                  })
              }));
          }else{
              this.setState((state, props) => ({
                receivingStatus: state.givingStatus.map((val)=>{
                      return currentState;
                  }),
                  receiving:[]
              }));
          }
    }
    render() {
        
        const items = this.state.users.map((u,index)=> {
            
        let result = <Form.Group controlId="formBasicCheckbox" className={styles.userRow} as={Row}>  
                            <Col>{u.username}</Col>
                            <Col><Form.Check inline type="checkbox" name={u.id} onChange={(evt) => this.handleGiving(evt,index)} label="" checked={this.state.givingStatus[index] || false}/></Col>
                            <Col><Form.Check inline type="checkbox" name={u.id} onChange={(evt) => this.handleReceiving(evt,index)} label="" checked={this.state.receivingStatus[index] || false}/></Col>
                    </Form.Group>;
        
        return result;
     });
     let url = "/admin";
     let today = new Date().toISOString().split("T")[0];

        return (
            <Container className="innerContent">
                <Row><Link href={url}>

                <a className="backlink"> &lsaquo;&lsaquo; Return Home </a></Link> </Row> 
                <h2>Create New Event</h2>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="eventTitle" as={Row}>
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="5">
                        <Form.Control required type="text" name="name" value={this.state.name}  maxLength="100" onChange={this.handleNameChange} />
                        <Form.Control.Feedback type="invalid">
                        Please fill out the Event Name.
                        </Form.Control.Feedback>
                        </Col>
                        
                    </Form.Group>

                    <Form.Group controlId="eventDate" as={Row}>
                        <Form.Label column sm="2">Date</Form.Label>
                        <Col sm="4" md="4">
                        <Form.Control required min={today} name="date" value={this.state.date} type="date" onChange={this.handleDateChange} />
                        <Form.Control.Feedback type="invalid">
                        Please enter the Event Date.
                        </Form.Control.Feedback>
                        </Col>
                        
                    </Form.Group>
                    <Row className={styles.titleRow}><Col sm="4">Name</Col>
                    <Col className={styles.titleCol}>
                        <input type="checkbox" id="checkAllGiving" onChange={this.checkAllGiving}/>
                        <label for="checkAllGiving" className={styles.checkTitle}>Giving Gifts </label></Col>
                    <Col className={styles.titleCol}> 
                        <input type="checkbox" id="checkAllReceiving" onChange={this.checkAllReceiving}/>
                        <label for="checkAllReceiving" className={styles.checkTitle}>Receiving Gifts</label></Col>
                    </Row>
                    {items}
                    {this.state.givingError ? <Row><Col>At least one person needs to give gifts.</Col></Row> : <></>}
                    {this.state.receivingError ? <Row><Col>At least one person needs to receive gifts.</Col></Row> : <></>}
                    
                    <Button variant="primary" type="submit">
                        Update Event
                    </Button>
                </Form>
            </Container>
        );
    }
}
export default CreateEvent

