import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
//import {claimItem, unclaimItem, getUser} from './API';
import {getID, getKey} from '../utils/session'
import {AuthGetRequest, AuthPostRequest} from '../utils/api';
class EditableInput extends React.Component {
    constructor(props){
        super(props);
        this.state={inEdit:false}
    }

    render() {
        return <div onClick={()=>this.setState({inEdit:true})}>
                {this.state.inEdit ? 
                <input type="text" value={this.props.text} 
                                onChange={(e)=>this.props.onChangeHandle(e,this.props.id)}
                                onBlur={(e)=>{this.props.onFinish(e,this.props.id); this.setState({inEdit:false});}}
                                                
                />
                :
                <p>{this.props.text}</p>
                }
            </div>
        
    }
}
export default EditableInput;