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
class ListView extends React.Component{
    constructor(props){
        super(props);
        this.state = {eventName:'',eventID:-1,list:[],user:''};
    }
    componentDidMount(){
        let url = "/api/lists/"+this.props.id;
        AuthGetRequest(url,getKey()).then((data)=>{
            console.log(data);
            if(!data.authorized){
                Router.push("/login");
            }
            let listData = data.data[0];
            let name = listData.user.username;
            let items = listData.list_items;
            let eventName = listData.event.eventName;
            let eventID = listData.event.id;
            this.setState({user:name,list:items, eventName:eventName,eventID:eventID});
        });
        // getList(this.props.match.params.id).then(data=>{
        //     //console.log(data);
        //     if(data.length > 0){
        //         this.setState({list:data[0].list_items,user:data[0].user.username,eventName:data[0].event.eventName,eventID:data[0].event.id});
                
        //     }
        // });
        
    }
    render(){
        let url = "/event/"+this.state.eventID;
        const list = this.state.list.map((Claim)=> 
            <ListItem id={Claim.id} name={Claim.name} cost={Claim.price} url={Claim.url} quantity={Claim.quantity} comments={Claim.comments} claimed={Claim.isClaimed} claimedBy={Claim.claimedBy}/>);
        return(
            <Container className="innerContent">
            <Row> <Link href={url}>
                <a className="backlink"> &lt; Return to {this.state.eventName}</a></Link> </Row> 
                <Row className="centered"><h1>{this.state.user}'s Wishlist</h1></Row>
            {/* <Row className="titleRow">
                <Col>
                    Item
                </Col>
                <Col className="d-none d-sm-block">
                    Cost
                </Col>
                <Col className="d-none d-sm-block">
                    Quantity
                </Col>
                <Col className="d-none d-sm-block">
                    Comments
                </Col>
                
                <Col>
                    
                </Col>
            </Row> */}
            {list}
            </Container>
        );
    }
}
export default ListView;