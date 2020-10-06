import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
//import {claimItem, unclaimItem, getUser} from './API';
import {getID, getKey} from '../utils/session'
import {AuthGetRequest, AuthPostRequest} from '../utils/api';
class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state={claimed:this.props.claimed,claimedBy:this.props.claimedBy,claimedName:''}
        this.claim = this.claim.bind(this)
        this.unclaim = this.unclaim.bind(this);
    }
    componentDidMount(){
       
        if(this.props.claimedBy !== null && this.props.claimedBy !== undefined){
            let userURL = "/api/user/"+this.props.claimedBy;
        AuthGetRequest(userURL,getKey()).then(data=>{
            console.log(data);
            if(data.length >=1){
                this.setState({claimedName:data[0].username});
            }
        });
    }
    }
    claim(event){
        let url = "/api/listitem/claim/"+this.props.id;
        let data = {
            isClaimed:true,
            claimedBy:getID()
        }
        AuthPostRequest(url,data,getKey()).then((data)=>{
            console.log(data);
            this.setState({claimed:true,claimedBy:getID()});
        });
    }
    unclaim(event){
        let url = "/api/listitem/claim/"+this.props.id;
        let data = {
            isClaimed:false,
            claimedBy:-1
        }
        AuthPostRequest(url,data,getKey()).then((data)=>{
            console.log(data);
            this.setState({claimed:false,claimedBy:-1});
        });
    }
    render() {
        let button;
        let deleteBtn;
        if(this.props.edit){
            button = <Button variant="outline-primary" className="claimBtn" onClick={this.props.editCallback}> Edit </Button>
            deleteBtn = <Button variant="outline-danger" className="claimBtn" onClick={this.props.deleteCallback}> Delete </Button>
        }else{
            if( this.state.claimedBy == getID()){
                button=<Button variant="outline-primary" className="claimBtn" onClick={this.unclaim}> UnClaim </Button>;
            }else if(this.state.claimed ){
                button=`Claimed by:${this.state.claimedName}`//<Button variant="outline-primary" className="claimBtn" disabled="true"> Claim </Button>;
            }else{
                button = <Button variant="primary" className="claimBtn" onClick={this.claim}> Claim </Button>
            }
        }
        let name;
        if(this.props.url !== undefined && this.props.url.length >1){
            let url = this.props.url;
            console.log(url.indexOf("http://"));
            if(url.indexOf("http://")<0  || url.indexOf("https://") <0){
                url = "http://"+url;
            }
            name = <a href={url}>{this.props.name}</a>
        }else{
            name  = this.props.name;
        }
        return (
            <>
                <Row className="listRow" >
                    <Col md="3" lg="4">
                        {name}
                    </Col>
                    <Col md="2" lg="2">
                        ${this.props.cost}
                    </Col>
                    <Col md="4" lg="4">
                        {this.props.comments}
                    </Col>
                
                    {this.props.edit}
                    <Row>
                        <Col md="auto">
                        {button}
                        
                    </Col>
                    <Col>
                    { deleteBtn}
                    </Col>
                    </Row>
                </Row>
            </>
        );
    }
}
export default ListItem;