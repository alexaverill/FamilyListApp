import React from 'react';
import ListItem from '../components/ListItem';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { AuthGetRequest } from '../utils/api';
import { getKey } from '../utils/session';
import { Router } from 'next/router';
//import {getList,claimItem, getEvent} from './API.js';
import Link from 'next/link'
import UserTable from '../components/UserTable';
class ListView extends React.Component{
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        
    }
    render(){
      
        return(
            <Container className="innerContent">
                <h2>Users</h2>
                <UserTable/>
                <h2>Settings</h2>
            </Container>
        );
    }
}
export default ListView;