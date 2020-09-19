
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {startSession,endSession} from '../utils/session';
//import { Redirect } from 'react-router-dom';
//import { useHistory } from "react-router-dom";
import {PostRequest} from "../utils/api";
class LoginView extends React.Component{
    constructor(props){
        super(props);
        this.state={username:'',password:'',loginError:false}
        this.handleUserChanged = this.handleUserChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        endSession();
    }
    handlePasswordChanged(event){
        this.setState({password:event.target.value});
    }
    handleUserChanged(event){
        this.setState({username:event.target.value});
    }
    handleSubmit(event){
        let data = {
            username:this.state.username,
            password:this.state.password
        }
        let url = "/api/user/validate"
        PostRequest(url,data).then((data)=>{
            console.log(data);
            if(data.valid){
                startSession(data.username,data.id,data.token);
            }

        });
        // login(this.state.username,this.state.password).then(data=>{
        //     console.log(data);
        //     if(data.authentication.valid){
        //         startSession(this.state.username,data.id,data.authKey);
        //         this.props.history.push('/');
        //     }else{
        //         //show error
        //         this.setState({loginError:true});
        //     }
        // });
        event.preventDefault();
    }
    render(){
        return(
            <Container class="innerContainer">
                 <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="eventTitle">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={this.handleUserChanged} />
                    </Form.Group>

                    <Form.Group controlId="eventDate">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control name="password" type="password" onChange={this.handlePasswordChanged} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                {this.state.loginError ? <h2>Invalid Login</h2>:''}
            </Container>
        );
    }
}
export default LoginView;