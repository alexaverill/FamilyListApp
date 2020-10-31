import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {AuthGetRequest, AuthPostRequest,AuthDeleteRequest} from '../utils/api';
import { getKey } from '../utils/session';
import EditableInput from './EditableInput'
import ResetPassword from './ResetPassword';

class CreateUserForm extends React.Component{
    
    constructor(props){
        super(props);
        //{this.props.date.toDateString()}
        this.state = {name:'',email:'',password:'',isAdmin:false}
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(event){
        this.setState({name:event.target.value});
    }
    handleEmailChanged(event){
        this.setState({email:event.target.value});
    }
    handlePasswordChanged(event){
        this.setState({password:event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        console.log("Submit!");
        
        let userData = {
            username:this.state.name,
            email:this.state.email,
            password:this.state.password
        }
        this.props.submitCallback(userData);
        
    }
    
    render() {
        return(
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="eventTitle"  as={Row} className="leftJustifyRow">
                        <Form.Label column sm="2">Name</Form.Label>
                        <Col sm="8">
                        <Form.Control type="text" name="name"  maxLength="100" onChange={this.handleNameChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="email" className="leftJustifyRow" as={Row}>
                        <Form.Label column sm="2">Email:</Form.Label>
                        <Col sm="8" md="8">
                        <Form.Control type="email" name="email"  maxLength="100" onChange={this.handleEmailChanged} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="password" className="leftJustifyRow" as={Row}>
                        <Form.Label column sm="2">Password:</Form.Label>
                        <Col sm="8" md="8">
                        <Form.Control type="text" name="password"  maxLength="100" onChange={this.handlePasswordChanged} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create User
                    </Button>
                </Form>);
    }
}

export default CreateUserForm;