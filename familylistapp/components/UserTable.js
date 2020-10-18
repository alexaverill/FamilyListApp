import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import {AuthGetRequest, AuthPostRequest} from '../utils/api';
import { getKey } from '../utils/session';
import EditableInput from './EditableInput'
class UserTable extends React.Component{
    
    constructor(props){
        super(props);
        //{this.props.date.toDateString()}
        this.state = {users:["1S"]}
        this.handleChangedName = this.handleChangedName.bind(this);
        this.handleUserUpdate = this.handleUserUpdate.bind(this);
        this.handleChangedEmail = this.handleChangedEmail.bind(this);
    }
    componentDidMount(){
        let url = "/api/user"
        AuthGetRequest(url,getKey()).then((data)=>{
            console.log(data);
            this.setState({users:data})
        })
    }
    handleUserUpdate(e,id){
        let userObj;
        let users = this.state.users;
        users.forEach((u)=>{
            if(u.id === id){
                userObj = u;
            }
        });
        let url = "/api/user/"+id;
        console.log(getKey());
        AuthPostRequest(url,userObj,getKey()).then((data)=>{
            console.log(data);
        });
    }
    handleChangedName(event,id){
        let users = this.state.users;
        users.forEach((u)=>{
            if(u.id === id){
                
                u.username = event.target.value;
            }
        });
        this.setState({users:users});
    }
    handleChangedEmail(event,id){
        let users = this.state.users;
        users.forEach((u)=>{
            if(u.id === id){
                
                u.email = event.target.value;
            }
        });
        this.setState({users:users});
    }
    render() {
        let userTable = this.state.users.map((user)=>{
            return <tr>
           
            <td><EditableInput text={user.username} id={user.id}
                         onChangeHandle={this.handleChangedName}
                         onFinish = {this.handleUserUpdate}/></td>
            <td><EditableInput text={user.email} id={user.id}
                         onChangeHandle={this.handleChangedEmail}
                         onFinish = {this.handleUserUpdate}/></td>
            <td><Button>Reset</Button></td>
          </tr>;
        })
        return (
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Reset Password</th>
    </tr>
  </thead>
  <tbody>
            {userTable}
            </tbody>
            </Table>
        );
    }
}

export default UserTable;