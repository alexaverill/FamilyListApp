import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import {AuthGetRequest, AuthPostRequest,AuthDeleteRequest} from '../utils/api';
import { getKey } from '../utils/session';
import EditableInput from './EditableInput'
import ResetPassword from './ResetPassword';
class UserTable extends React.Component{
    
    constructor(props){
        super(props);
        //{this.props.date.toDateString()}
        this.state = {users:["1S"]}
        this.handleChangedName = this.handleChangedName.bind(this);
        this.handleUserUpdate = this.handleUserUpdate.bind(this);
        this.handleChangedEmail = this.handleChangedEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    findUserPosition(prop,searchVal){
        let users = this.state.users;
        for(let x=0; x<users.length; x++){
            if(users[x][prop] === searchVal){
                return x;
            }
        }
        return -1;
    }
    componentDidMount(){
        let url = "/api/user"
        AuthGetRequest(url,getKey()).then((data)=>{
            console.log(data);
            this.setState({users:data})
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
    deleteUser(id){
        let url = "/api/user/"+id;
        AuthDeleteRequest(url,{},getKey()).then((data)=>{
            console.log(data);
            let pos = this.findUserPosition("id",id);
            if(pos <0){ return;}
            let users = this.state.users;
            users.splice(pos,1);
            this.setState({users:users});
        })
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
            <td>
                <ResetPassword text={user.password} id={user.id} onChangeHandle={this.handleChangePassword}
                                onFinish={this.handleUserUpdate}/> 
                <button className="btn btn-danger" onClick={()=>{this.deleteUser(user.id);}}>Delete</button>
            </td>
                                
          </tr>;
        })
        return (
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Manage</th>
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