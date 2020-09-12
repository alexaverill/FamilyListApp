import React from 'react';
import ListItem from './ListItem.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import {createEvent, getUsers} from './API.js';

class CreateEventView extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {name:'',date:new Date(),comments:'',users:[{id:1,username:"test"},{id:2,username:"lol"}],giving:[],recieving:[]};
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGiving = this.handleGiving.bind(this);
        this.handleRecieving = this.handleRecieving.bind(this);
    }
    handleNameChange(event){
        const _name = event.target.value;
        this.setState({name:_name});
    }
    handleDateChange(event){
        this.setState({date:event.target.value});
    }
    async handleSubmit(event){
        //console.log("Submitted");
        //console.log(event);
        event.preventDefault();
        // createEvent(this.state.name,this.state.date,this.state.comments,this.state.giving,this.state.recieving).then(data=>{
        //     if(data.status ==="true"){
        //         let url = "/events/"+data.id;
        //         this.props.history.push(url);
        //     }
        //     console.log(data);
        // });

    }
    handleGiving(event){
        let value = event.target.name;
        let givingArr = this.state.giving;
        if(event.target.checked){
            if(givingArr.indexOf(value)<0){
                givingArr.push(value);
                this.setState({giving:givingArr});
            }
        }else{
        
            let pos = givingArr.indexOf(value);
            givingArr.splice(pos,1);
            this.setState({giving:givingArr});
        }
    }
    handleRecieving(event){
        let value = event.target.name;
        let recievingArr = this.state.recieving;
        if(event.target.checked){
            if(recievingArr.indexOf(value)<0){
                recievingArr.push(value);
                this.setState({recieving:recievingArr});
            }
        }else{
        
            let pos = recievingArr.indexOf(value);
            recievingArr.splice(pos,1);
            this.setState({recieving:recievingArr});
        }
    }
    async queryUsers(){
        let users = await getUsers();
        
        return users;
    }
    componentDidMount(){
      this.queryUsers().then((user)=>{
          this.setState({users:user});
        });
        
        //this.setState({users:userList});
    }
    render() {
        const items = this.state.users.map((u)=> <Form.Group controlId="formBasicCheckbox" as={Row}>  
            <Col>{u.username}</Col>
            <Col><Form.Check inline type="checkbox" name={u.id} onChange={this.handleGiving} label="" /></Col>
            <Col><Form.Check inline type="checkbox" name={u.id} onChange={this.handleRecieving} label="" /></Col>
            </Form.Group>);
        return (
            <Container className="innerContent">
                <h2>Create New Event</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="eventTitle" as={Row}>
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="name"  maxLength="100" onChange={this.handleNameChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="eventDate" as={Row}>
                        <Form.Label column sm="2">Date:</Form.Label>
                        <Col sm="2">
                        <Form.Control name="date" type="date" onChange={this.handleDateChange} />
                        </Col>
                    </Form.Group>
                    <Row><Col>Name</Col><Col>Giving Gifts</Col><Col>Recieving Gifts</Col></Row>
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

