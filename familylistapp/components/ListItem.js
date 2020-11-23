import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
//import {claimItem, unclaimItem, getUser} from './API';
import {getID, getKey} from '../utils/session'
import {AuthGetRequest, AuthPostRequest} from '../utils/api';
import styles from "../styles/listitem.module.css";
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
        let button=<></>;;
        let deleteBtn;
        let bgClass = "";
        let claimedText = ""
        if(this.props.edit){
            if(this.props.showClaimed){
                if(this.state.claimedName){
                    claimedText = `Given by: ${this.state.claimedName}`
                }
                else{
                    claimedText = ''
                }
            }else{
                button = <Button variant="outline-primary" className="claimBtn" onClick={this.props.editCallback}> Edit </Button>
                deleteBtn = <Button variant="outline-danger"  onClick={this.props.deleteCallback}> Delete </Button>
            }
        }else{
            if( this.state.claimedBy == getID()){
                bgClass=styles.listRowclaimed;
                claimedText = "Claimed by: You";
                button=<Button variant="outline-primary" className="unclaimBtn" onClick={this.unclaim}> Unclaim </Button>;
            }else if(this.state.claimed ){
                bgClass=styles.listRowClaimedOthers;
                claimedText=`Claimed by: ${this.state.claimedName}`//<Button variant="outline-primary" className="claimBtn" disabled="true"> Claim </Button>;
                
            }else{
                button = <Button  className="claimBtn" onClick={this.claim}> Claim </Button>
            }
        }
        let name;
        if(this.props.url !== undefined && this.props.url.length >1){
            let url = this.props.url;
            //console.log(url);
            //console.log(url.indexOf("https://"));
            if(url.indexOf("http://")<0  && url.indexOf("https://") <0){
                url = "http://"+url;
            }
            
            name = <a href={url}>{this.props.name}</a>
        }else{
            name  = this.props.name;
        }
        return (
            <>
                <Row className={`listRow ${bgClass}` } >
                    <Col xs="8" md="4" lg="3">
                        {name}
                    </Col>
                    <Col xs="4" md="2" lg="1">
                        <strong>${this.props.cost}</strong>
                    </Col>
                    <Col xs="12" md="6" lg="5">
                        {this.props.comments}
                    </Col>
                    <Col className={styles.claimSection}>
                        {claimedText}
                        {button}
                    </Col>
                    {deleteBtn? <Col>
                    { deleteBtn}
                    </Col>:<></>}
                </Row>
            </>
        );
    }
}
export default ListItem;