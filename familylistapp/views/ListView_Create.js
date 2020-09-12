import React from 'react';
import ListItem from '../components/ListItem'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {GetRequest} from '../utils/api'
// import CreateListItem from './CreateListItem.js';
import CreateListItem from '../components/ListItem_Create';
//import {Link} from "react-router-dom";
import Link from 'next/link'
//import { getID } from './Session.js';
class CreateListView extends React.Component{
    constructor(props){
        super(props);
        this.state = {eventName:"",eventID:"",listID:'',listItems:[]};
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount(){
        console.log(this.props.id); 
        let url = "/api/event/"+this.props.id;
        GetRequest(url).then((data)=>{
            this.setState({eventName:data.eventName,eventID:data.id})
        })
        // getEvent(this.props.match.params.id).then(data=>{
            
        //     this.setState({eventName:data.event.eventName,eventID:data.event.id})

        // });
        // createList(this.props.match.params.id,this.state.eventName,getID()).then(data=>{
        //     console.log(data.id);
        //     this.setState({listID:data.id})
        //     let list = this.state.listItems;
        //     if(data.list != undefined && data.list.length>0){
        //         let listItems = data.list[0].list_items;
        //         for(let x=0; x<listItems.length; x++){
        //             let i = listItems[x];
        //              list.push(<CreateListItem edit={false} listID={this.state.listID} itemName={i.name} cost={i.cost} quantity={i.quantity} url={i.url} comments={i.comments}/>);
        //         }
                
        //     }
        //     this.setState({listItems:list});
            
        // });
    }
    handleAdd(event){
        let list = this.state.listItems;
        list.push(<CreateListItem edit={true} listID={this.state.listID}/>);
        this.setState({listItems:list});
    }
    render(){
        let url = "/events/"+this.state.eventID;
        return (
            <Container className="innerContent">
                {/* <Row> <Link href={url}><a>&lt; Return to {this.state.eventName}</a> </Link> </Row> */}
                <Row className="centered"><h1>Create Your Wishlist for {this.state.eventName}</h1></Row>
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
                
            </Row>
                <Row lg={1} md={1} sm={1} xl={1} xs={1}>
                    {this.state.listItems}
                </Row>
                <Button onClick={this.handleAdd}>Add Item</Button>
            </Container>

        );
    }
}
export default CreateListView;