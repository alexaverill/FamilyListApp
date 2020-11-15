import React from 'react';
import ListItem from './ListItem.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
//import {addListItem} from './API.js';
import {AuthPostRequest, PostRequest, AuthDeleteRequest} from '../utils/api'
import {getKey} from '../utils/session';
import  Router  from 'next/router';
class CreateListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id:-1,listID: -1,inEdit: this.props.edit, itemName: '', cost: '', quantity: 1, comments: '', url: '', validated:false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCost = this.handleCost.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleURL = this.handleURL.bind(this);
        this.handleComments = this.handleComments.bind(this);
        this.editCallback = this.editCallback.bind(this);
        this.deleteCallback = this.deleteCallback.bind(this);
    }
    componentDidMount(){
        if(this.props.itemName !==undefined){
            this.setState({itemName:this.props.itemName});
        }
        if(this.props.cost !==undefined){
            this.setState({cost:this.props.cost});
        }
        if(this.props.quantity !==undefined){
            this.setState({quantity:this.props.quantity});
        }
        if(this.props.comments !==undefined){
            this.setState({comments:this.props.comments});
        }
        if(this.props.url !==undefined){
            this.setState({url:this.props.url});
        }
        if(this.props.id !== undefined){
            this.setState({id:this.props.id});
        }
        if(this.props.listID !== undefined){
            console.log("LIST ID: "+this.props.listID);
            this.setState({listID:this.props.listID})
        }
    }
    handleNameChange(event) {
        this.setState({ itemName: event.target.value });
    }
    deleteCallback(){
            let url = "/api/listitem/"+this.state.id;
            AuthDeleteRequest(url,getKey()).then((data)=>{
                console.log(data);
                this.props.itemDeleted(this.state.id);

            })
    }
    handleSubmit(event) {

        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({validated:true});
        } else{
            event.preventDefault();
            let listItem = {
                name: this.state.itemName,
                url: this.state.url,
                price: this.state.cost,
                isClaimed: false,
                listId: this.state.listID,
                quantity: 1,
                comments: this.state.comments
            }
            console.log(listItem);
            let url = "/api/listitem";
            if(this.state.id >0){
            
                url = "/api/listitem/"+this.state.id;
                listItem.id = this.state.id;
            }
            AuthPostRequest(url,listItem,getKey()).then((data)=>{
                console.log(data);
                if(!data.authorized){
                    Router.push("/login");
                }
                console.log(data.data);
                this.setState({ inEdit: false,id:data.data.id });
            });
        }
    }
    handleCost(event) {
        this.setState({ cost: event.target.value });
    }
    handleQuantity(event) {
        this.setState({ quantity: event.target.value });
    }
    handleURL(event) {
        this.setState({ url: event.target.value });
    }
    handleComments(event) {
        this.setState({ comments: event.target.value });
    }
    editCallback() {
        this.setState({ inEdit: true })
    }
    render() {
        if (this.state.inEdit) {
            return (
                <Row lg={1} md={1} sm={1} xl={1} xs={1}>
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit} className="list-edit">
                        <Form.Row>
                            <Col md={8}>
                                <Form.Group controlId="itemName" className="form-group-right-spacing">
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control type="text" name="name" value={this.state.itemName} required maxLength="100" onChange={this.handleNameChange} />
                                    <Form.Control.Feedback type="invalid">
                                    Please enter the name of the item.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="cost" md="4" sm="4" >
                                    <Form.Label>Cost</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control name="cost" type="number" min="0" value={this.state.cost} step="any" onChange={this.handleCost} />
                                        <Form.Control.Feedback type="invalid">
                                        Please enter the item cost. If there is no cost, enter 0.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col md={12}>
                                <Form.Group controlId="url" >
                                    <Form.Label>Item URL</Form.Label>
                                    <Form.Control name="url" type="text" onChange={this.handleURL} value={this.state.url}  maxLength="255" />
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col md={12}>
                                <Form.Group controlId="comments" >
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control name="comments" type="text" onChange={this.handleComments} value={this.state.comments}  maxLength="255"/>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Button variant="primary" type="submit">
                            Save
                    </Button>
                    </Form>
                    </Row>
            )
        } else {
            return (
                <Row lg={1} md={1} sm={1} xl={1} xs={1}>
                <ListItem name={this.state.itemName} cost={this.state.cost} url ={this.state.url} quantity={this.state.quantity} comments={this.state.comments} edit={true} editCallback={this.editCallback} deleteCallback={this.deleteCallback} />
                </Row>
            );
        }
    }
}
export default CreateListItem;