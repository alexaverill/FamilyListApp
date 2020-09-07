import React from 'react';
import ListItem from './ListItem.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {getList,claimItem, getEvent} from './API.js';
import {Link} from "react-router-dom";
class ListView extends React.Component{
    constructor(props){
        super(props);
        this.state = {eventName:'',eventID:-1,list:[],user:''};
    }
    componentDidMount(){
        getList(this.props.match.params.id).then(data=>{
            //console.log(data);
            if(data.length > 0){
                this.setState({list:data[0].list_items,user:data[0].user.username,eventName:data[0].event.eventName,eventID:data[0].event.id});
                
            }
        });
        
    }
    render(){
        let url = "/events/"+this.state.eventID;
        const list = this.state.list.map((Claim)=> 
            <ListItem id={Claim.id} name={Claim.name} cost={Claim.cost} url={Claim.url} quantity={Claim.quantity} comments={Claim.comments} claimed={Claim.isClaimed} claimedBy={Claim.claimedBy}/>);
        return(
            <Container className="innerContent">
            <Row> <Link to={url}> &lt; Return to {this.state.eventName}</Link> </Row>
                <Row className="centered"><h1>{this.state.user}'s Wishlist</h1></Row>
            <Row className="titleRow">
                <Col>
                    Item
                </Col>
                <Col>
                    Cost
                </Col>
                <Col>
                    Quantity
                </Col>
                <Col>
                    Comments
                </Col>
                
                <Col>
                    
                </Col>
            </Row>
            {list}
            </Container>
        );
    }
}
export default ListView;