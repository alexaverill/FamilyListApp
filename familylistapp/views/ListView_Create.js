import React from 'react';
import ListItem from '../components/ListItem'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {AuthGetRequest,AuthPostRequest} from '../utils/api'
import CreateListItem from '../components/ListItem_Create';
import Link from 'next/link'
import { getID, getKey, getUsername } from '../utils/session';
import Router from 'next/router';
class CreateListView extends React.Component{
    constructor(props){
        super(props);
        this.state = {eventName:"",eventID:"",listID:'',listItems:[],host:this.props.host,emailSent:false};
        this.handleAdd = this.handleAdd.bind(this);
        this.handleItemDeleted = this.handleItemDeleted.bind(this);
        this.sendReminder = this.sendReminder.bind(this);
    }
    refreshList(){
        let createListURL = "/api/lists"
        AuthPostRequest(createListURL,{id:this.props.id,userID:getID()},getKey()).then((data)=>{
            //console.log(data);
            if(!data.authorized){
                Router.push('/login');
                return;
            }
            this.setState({listID:data.data.id});
            let list = [];//this.state.listItems;
            let showClaimed = false;
            let currentDate = new Date();
            
            if(currentDate > this.state.eventDate){
                showClaimed = true;
            }
            if(data.data.list_items != undefined && data.data.list_items.length > 0){
                let itemArr = data.data.list_items;
                
                itemArr.forEach((item)=>{
                    
                    list.push(<CreateListItem  id={item.id} edit={false} listID={this.state.listID} itemDeleted={this.handleItemDeleted}
                        itemName={item.name} cost={item.price} quantity={item.quantity} url={item.url} comments={item.comments} claimed={item.claimedBy} showClaimed={showClaimed}/>);
                });
            }

            this.setState({listItems:list});
        });
    }
    componentDidMount(){
        console.log(this.props.id); 
        let url = "/api/event/"+this.props.id;
        AuthGetRequest(url,getKey()).then((data)=>{
            if(!data.authorized){
                Router.push('/login');
                return;
            }
            let tmpDate = data.data.eventDate;
            let dateStr = data.data.eventDate.split("T")[0];
            let date = new Date(dateStr);
            this.setState({eventName:data.data.eventName,eventID:data.data.id,eventDate:date});
            this.refreshList();
        })
        

    }
    handleItemDeleted(itemID){
        this.refreshList();
    }
    handleAdd(event){
        console.log("LIST ID: "+this.state.listID);
        let list = this.state.listItems;
        list.push(<CreateListItem edit={true} listID={this.state.listID} itemDeleted={this.handleItemDeleted}/>);
        this.setState({listItems:list});
    }
    sendReminder(){
       if(this.state.emailSent){return;}
        let url = "/api/email";
        let sub = `${this.state.eventName} - ${getUsername()}'s list`
        let msg = `${getUsername()} has created a list for ${this.state.eventName}!.
        This list can be can be viewed: <a href="http://familylistapp.com/list/${this.state.listID}">http://familylistapp.com/list/${this.state.listID}</a>`;
        
        let data = {
            eventID: this.state.eventID,
            message:msg,
            subject:sub
        }
        AuthPostRequest(url,data,getKey());
        this.setState({emailSent:true})
    }
    render(){
        if(this.state.eventName.length <=0){return <></>;}
        let url = "/event/"+this.state.eventID;
        let items = this.state.listItems;
        let emailText = this.state.emailSent? "Your wishlist has been shared with everyone. It could take a few minutes for the email to show up." : "When you're finished with your wishlist, use the button below to let everyone know it's ready.";
        return (
            <Container className="innerContent">
                            <Row> <Link href={url}>
                <a className="backlink"> &lsaquo;&lsaquo; Return to {this.state.eventName}</a></Link> </Row> 
                <Row className="centered"><h1>Create Your Wishlist for {this.state.eventName}</h1></Row>
                <Row className="headerRow"><div><p>{emailText}</p></div></Row>
        <Row className="headerRow"><div>{this.state.emailSent ? <></>:<Button onClick={this.sendReminder}>Share Wishlist</Button>}</div></Row>
            <div className="item-row">
                    {items}
            </div>
                <hr></hr>
                <Button onClick={this.handleAdd}>Add A New Item</Button>
                
            </Container>

        );
    }
}
export default CreateListView;