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
class UserTable extends React.Component{
    
    constructor(props){
        super(props);
        //{this.props.date.toDateString()}
        this.state = {users:[]}
        this.handleChangedName = this.handleChangedName.bind(this);
        this.handleUserUpdate = this.handleUserUpdate.bind(this);
        this.handleChangedEmail = this.handleChangedEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleAdminCheck = this.handleAdminCheck.bind(this);
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
    render() {
        let userTable;
        if(this.state.users.length>0){
             userTable= this.state.users.map((user)=>{
                
                return <tr>
            
                <td><EditableInput text={user.username} id={user.id}
                            onChangeHandle={this.handleChangedName}
                            onFinish = {this.handleUserUpdate}/></td>
                <td><EditableInput text={user.email} id={user.id}
                            onChangeHandle={this.handleChangedEmail}
                            onFinish = {this.handleUserUpdate}/></td>
                <td><input type="checkbox" onChange={(e)=>this.handleAdminCheck(e,user.id)} checked={user.isAdmin} /></td>
                <td>
                    <Row>
                    <ResetPassword text={user.password} id={user.id} onChangeHandle={this.handleChangePassword}
                                    onFinish={this.handleUserUpdate}/> 
                    <button className="btn btn-danger" onClick={()=>{this.deleteUser(user.id);}}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
            <Row className="leftJustifyRow">
                <OverlayTrigger trigger="click"  rootClose placement="bottom" overlay={userPopover}>
                    <Button onClick={this.addUser}>Add User</Button>
                    </OverlayTrigger>
            
            </Row>

            <Row>
                
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Administrator</th>
                    <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {userTable}
                </tbody>
            </Table>
            </>
        );
    }
}

export default UserTable;