import React from 'react';
import ListItem from '../components/ListItem';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { AuthGetRequest } from '../utils/api';
import { getKey } from '../utils/session';
import Router from 'next/router';
import Link from 'next/link'
import UserTable from '../components/UserTable';
import EventTable from '../components/EventTable';
class ListView extends React.Component{
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        let url = "/api/admin"
        AuthGetRequest(url,getKey()).then((data)=>{
            console.log(data);
            if(!data.authorized){
                Router.push("/login");
            }
            this.setState({users:data})
        })
    }
    render(){
      
        return(
            <Container className="innerContent">
                <h2>Users</h2>
                <UserTable/>
                <h2>Events</h2>
                <EventTable/>
            </Container>
        );
    }
}
export default ListView;