import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {claimItem, unclaimItem, getUser} from './API';
import {getID} from './Session';
class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state={claimed:this.props.claimed,claimedBy:this.props.claimedBy,claimedName:''}
        this.claim = this.claim.bind(this)
        this.unclaim = this.unclaim.bind(this);
    }
    componentDidMount(){
        console.log(this.props.claimedBy);
        if(this.props.claimedBy !== null && this.props.claimedBy !== undefined){
        getUser(this.props.claimedBy).then(data=>{
            console.log(data);
            this.setState({claimedName:data[0].username});
        });
    }
    }
    claim(event){
        console.log(event);
        claimItem(this.props.id,getID()).then((data)=>{
            console.log(data);
            this.setState({claimed:true,claimedBy:getID()});
        });
    }
    unclaim(event){
        unclaimItem(this.props.id,getID()).then(data=>{
            this.setState({claimed:false,claimedBy:null});
        });
    }
    render() {
        let button;
        if(this.props.edit){
            button = <Button variant="outline-primary" className="claimBtn" onClick={this.props.editCallback}> Edit </Button>
        }else{
            if( this.state.claimedBy == getID()){
                button=<Button variant="outline-primary" className="claimBtn" onClick={this.unclaim}> UnClaim </Button>;
            }else if(this.state.claimed ){
                button=`Claimed By:${this.state.claimedName}`//<Button variant="outline-primary" className="claimBtn" disabled="true"> Claim </Button>;
            }else{
                button = <Button variant="primary" className="claimBtn" onClick={this.claim}> Claim </Button>
            }
        }
        let name;
        if(this.props.url !== undefined){
            name = <a href={this.props.url}>{this.props.name}</a>
        }else{
            name  = this.props.name;
        }
        return (
            <>
                <Row className="listRow">
                    <Col>
                        {name}
                    </Col>
                    <Col>
                        {this.props.cost}
                    </Col>
                    <Col>
                        {this.props.quantity}
                    </Col>
                    <Col>
                        {this.props.comments}
                    </Col>
                
                    {this.props.edit}
                    <Col>
                        {button}
                    </Col>
                </Row>
            </>
        );
    }
}
export default ListItem;